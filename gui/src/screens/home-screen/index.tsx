import React from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";
import useSWR from "swr";
import { format } from "date-fns-tz";

import { getGreeting } from "../../utils/helpers";
import useUserGlobalStore from "../../store/useUserGlobalStore";
import { ITask } from "../../types";
import { fetcher } from "../../services/config";
import Loader from "../../components/shared/loader";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import { AnimatedText, Box, Text } from "../../utils/theme";
import TaskActions from "../../components/tasks/task-actions";
import Task from "../../components/tasks/task";
import { removeToken } from "../../services/api";

const today = new Date();
const greeting = getGreeting({ hour: today.getHours() });

const HomeScreen: React.FC = () => {
  const { user } = useUserGlobalStore();

  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>("tasks/", fetcher, {
    refreshInterval: 1000,
  });

  const logout = async () => {
    const { updateUser } = useUserGlobalStore.getState();
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đăng xuất",
          onPress: async () => {
            try {
              await removeToken();
              updateUser(null);
              console.log("Đã đăng xuất thành công");
            } catch (error) {
              console.error("Error logging out:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading || !tasks) {
    return <Loader />;
  }

  // Đếm số lượng task chưa hoàn thành
  const pendingTasksCount = tasks.filter(task => !task.isCompleted).length;

  // Sắp xếp các task
  const sortedTasks = tasks
    .slice()
    .sort((a, b) => {
      const dueDateA = new Date(a.date);
      const dueDateB = new Date(b.date);

      // Đưa các task chưa hoàn thành lên đầu
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      // Sắp xếp các task chưa hoàn thành theo ngày đến hạn gần nhất
      // và các task đã hoàn thành theo ngày đến hạn xa nhất
      return a.isCompleted
        ? dueDateB.getTime() - dueDateA.getTime() // Task đã hoàn thành: ngày đến hạn xa nhất
        : dueDateA.getTime() - dueDateB.getTime(); // Task chưa hoàn thành: ngày đến hạn gần nhất
    });

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4" mt="4">
        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
          <AnimatedText
            variant="textXl"
            fontWeight="500"
            entering={ZoomInEasyDown.delay(500).duration(700)}
          >
            Good {greeting}, {''}
            <Text color="red500">{user?.name}</Text>
          </AnimatedText>
          <Pressable onPress={logout}>
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={styles.avatar}
            />
          </Pressable>
        </Box>

        <Box flexDirection="row" alignItems="center" mt="2">
          <Text variant="textXl" fontWeight="500">
            It’s {format(today, "eeee, LLL dd y")} - {pendingTasksCount} tasks
          </Text>
        </Box>

        <Box height={26} />
        <TaskActions categoryId="" />
        <Box height={26} />

        <FlatList
          data={sortedTasks}
          renderItem={({ item }) => (
            <Task task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
