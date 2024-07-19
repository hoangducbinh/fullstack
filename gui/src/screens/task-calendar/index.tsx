import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import useSWR from "swr";
import { format, parseISO } from "date-fns";
import { fetcher } from "../../services/config";
import Loader from "../../components/shared/loader";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import { Box, Text } from "../../utils/theme";
import Task from "../../components/tasks/task";
import { Calendar } from "react-native-calendars";
import { ITask } from "../../types";

const TaskCalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`tasks`, fetcher, {
    refreshInterval: 5000,
  });

  if (isLoadingTasks || !tasks) {
    return <Loader />;
  }

  const markedDates = tasks.reduce((acc, task) => {
    const date = format(parseISO(task.date), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = { marked: true, dotColor: 'blue' };
    }
    return acc;
  }, {} as { [key: string]: { marked: boolean, dotColor: string } });

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Text variant="textXl" fontWeight="700" ml="3">
          Events
        </Text>
        <Box height={16} />

        <Box mb="4">
          <View style={styles.calendarContainer}>
            <Calendar
              current={format(new Date(), "yyyy-MM-dd")}
              onDayPress={handleDayPress}
              markedDates={markedDates}
              theme={{
                calendarBackground: 'white',
                textSectionTitleColor: 'blue',
                selectedDayBackgroundColor: 'blue',
                selectedDayTextColor: 'white',
                todayTextColor: 'blue',
                dayTextColor: 'black',
                dotColor: 'blue',
                selectedDotColor: 'white',
                arrowColor: 'blue',
              }}
            />
          </View>
        </Box>

        <Text variant="textLg" fontWeight="500" ml="3" mb="4">
          Tasks for {format(parseISO(selectedDate), "MMMM dd, yyyy")}
        </Text>

        <FlatList
          data={tasks.filter(task => format(parseISO(task.date), "yyyy-MM-dd") === selectedDate)}
          renderItem={({ item }) => <Task task={item} mutateTasks={mutateTasks} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white', // Thêm màu nền cố định
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default TaskCalendarScreen;
