import React from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet, View } from "react-native";
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
import { colors } from "../../utils/theme/colors";


const today = new Date();
const greeting = getGreeting({ hour: today.getHours() });

const HomeScreen: React.FC = () => {
  const { user } = useUserGlobalStore();
 const defaultAvatar = "https://picsum.photos/200";
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
        {/* Header */}
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" mb="4">
          <View style={styles.header}>
          <Image
              source={{ uri: user?.avatar || defaultAvatar }} 
              style={styles.avatar}
            />
            <View style={styles.headerTextContainer}>
              <AnimatedText
                variant="textXl"
                fontWeight="600"
                entering={ZoomInEasyDown.delay(500).duration(700)}
                style={{ color: colors.primary }}
              >
                Xin chào {greeting},
                <Text style={{ color: colors.fuchsia500 }}> {user?.name}</Text>
              </AnimatedText>
              <Text style={{ color: colors.gray600 }}>
                {format(today, "eeee, LLL dd y")}
              </Text>
            </View>
          </View>
         
        </Box>

        {/* Task Count */}
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" mb="4">
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            Hôm nay có
          </Text>
          <Box
            p="3"
            style={[styles.taskCountContainer,{borderRadius: 8, backgroundColor: colors.gray100}]}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.blu400 }}>
              {pendingTasksCount} Công việc cần hoàn thành
            </Text>
          </Box>
        </Box>

        {/* Task Actions */}
        <TaskActions categoryId="" />
        <Box height={26} />

        {/* Task List */}
        <FlatList
          data={sortedTasks}
          renderItem={({ item }) => (
            <Task task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box/>}
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 8,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCountContainer: {
    borderColor: colors.gray200,
    borderWidth: 1,
    padding: 8,
  },
});
