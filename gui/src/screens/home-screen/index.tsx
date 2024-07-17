import { format } from "date-fns-tz";
import React from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";

import useSWR from "swr";
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
const greeting = getGreeting({ hour: new Date().getHours() });

const HomeScreen = () => {
  const { user } = useUserGlobalStore();

  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>("tasks/", fetcher,
    {
      refreshInterval: 1000,
    }
  );

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
//https://tq6.mediacdn.vn/thumb_w/640/133514250583805952/2020/7/11/-1594456254224668535202.jpg
//https://picsum.photos/200
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
            <Text color="red500">
            {user?.name}
            </Text>
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
            It’s {format(today, "eeee, LLL dd y")} - {tasks.length} tasks
          </Text>
        </Box>

        <Box height={26} />
        <TaskActions categoryId="" />
        <Box height={26} />
       
        <FlatList
          data={tasks}
          renderItem={({ item }) =>( 
          <Task task={item} mutateTasks={mutateTasks} />
          )
        }
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
