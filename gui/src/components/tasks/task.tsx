import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import useSWRMutation from "swr/mutation";
import { ICategory, ITask } from "../../types";
import axiosInstance, { fetcher } from "../../services/config";
import { HomeScreenNavigationType } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Box } from "../../utils/theme";
import { isToday, format } from "date-fns";
import useSWR from "swr";

type TaskProps = {
  task: ITask;
  mutateTasks: () => Promise<ITask[] | undefined>;
};

interface ITaskStatusRequest {
  id: string;
  isCompleted: boolean;
}

const toggleTaskStatusRequest = async (
  url: string,
  { arg }: { arg: ITaskStatusRequest }
) => {
  try {
    await axiosInstance.put(url + "/" + arg.id, { ...arg });
  } catch (error) {
    console.log("error in toggleTaskStatusRequest", error);
    throw error;
  }
};

const Task = ({ task, mutateTasks }: TaskProps) => {
  const { trigger } = useSWRMutation("tasks/update", toggleTaskStatusRequest);
  const [updatedTask, setUpdatedTask] = useState(task);
  const navigation = useNavigation<HomeScreenNavigationType>();

  const toggleTaskStatus = async () => {
    try {
      const _updatedTask = {
        id: task._id,
        isCompleted: !task.isCompleted,
      };
      await trigger(_updatedTask);
      await mutateTasks();
    } catch (error) {
      console.log("error in toggleTaskStatus", error);
      throw error;
    }
  };

  const navigateToEditTask = () => {
    navigation.navigate("EditTask", { task });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  const { data: categories, isLoading } = useSWR<ICategory[]>(
    "categories",
    fetcher
  );
  
  const selectedCategory = categories?.find(
    (_category) => _category._id === updatedTask.categoryId
  );

  return (
    <View style={styles.pressable}>
      <View
        style={[
          styles.taskContainer,
          {
            backgroundColor: task.isCompleted ? "#fbcfe8" : "#ffffff",
            borderColor: task.isCompleted ? "#f9a8d4" : "#38bdf8",
          },
        ]}
      >
        <View style={styles.taskContent}>
          <Pressable
            style={[
              styles.checkmarkContainer,
              {
                backgroundColor: task.isCompleted ? "#f472b6" : "#f0f0f0",
              },
            ]}
            onPress={toggleTaskStatus}
          >
            {task.isCompleted && <Icon name="check" size={20} color="#ffffff" />}
          </Pressable>
          <View style={styles.taskTextContainer}>
            <Text
              style={[
                styles.taskText,
                {
                  color: task.isCompleted ? "#4caf50" : "#0284c7",
                  // textDecorationLine: task.isCompleted ? "line-through" : "none",
                  textDecorationLine: task.isCompleted ? "none" : "none",
                },
              ]}
            >
              {truncateText(task.name, 20)}
            </Text>
            {selectedCategory && (
              <Text style={[styles.categoryText, { color: selectedCategory.color.code }]}>
                {truncateText(selectedCategory.name, 20)}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Box
            bg="neutral100"
            p="2"
            borderRadius="rounded-xl"
            style={{ borderColor: "#e1e1e1", borderWidth: 1 }}
          >
            <Text style={styles.dateText}>
              {isToday(new Date(task.date)) ? "Today" : format(new Date(task.date), "MMM dd")}
            </Text>
          </Box>
        </View>
        <Pressable onPress={navigateToEditTask} style={styles.editButton}>
          <Icon name="dots-three-vertical" size={20} color="#555555" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 10,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkmarkContainer: {
    height: 28,
    width: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    elevation: 1,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  dateContainer: {
    marginRight: 12,
  },
  dateText: {
    fontSize: 14,
    color: "#888888",
  },
  editButton: {
    padding: 8,
  },
});

export default Task;
