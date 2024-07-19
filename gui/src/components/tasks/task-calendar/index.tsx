import React, { useState, useMemo } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import useSWR from "swr";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";
import { ITask } from "../../../types";
import { fetcher } from "../../../services/config";
import Loader from "../../shared/loader";
import SafeAreaWrapper from "../../shared/safe-area-wrapper";
import { Box, Text } from "../../../utils/theme";
import { Calendar } from "react-native-calendars";
import TaskUnScreen from "../task-group-complated/task-unscreen";
import Icon from "react-native-vector-icons/Entypo"; // Import icon library
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import icon library

const TaskCalendarComplatedScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`tasks/tasks-completed`, fetcher, {
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
    setCalendarVisible(false); // Close calendar on date selection
  };

  // Calculate the first and last day of the current month
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());

  // Filter tasks based on the selected date and search query
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const taskDate = parseISO(task.date);
      const taskDateFormatted = format(taskDate, "yyyy-MM-dd");
      return (
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedDate
          ? taskDateFormatted === selectedDate
          : taskDate >= startDate && taskDate <= endDate)
      );
    });
  }, [tasks, searchQuery, selectedDate]);

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Text variant="textXl" fontWeight="700" ml="3">
          Đã hoàn thành
        </Text>
        <Box height={16} />

        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#007bff" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm công việc"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable onPress={() => setCalendarVisible(!calendarVisible)} style={styles.iconButton}>
            <Icon name={calendarVisible ? "chevron-up" : "chevron-down"} size={24} color="#007bff" />
          </Pressable>
        </View>

        {calendarVisible && (
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
        )}

        <Text variant="textLg" fontWeight="500" ml="3" mb="4">
          Công việc {selectedDate ? `của ${format(parseISO(selectedDate), "dd MMMM yyyy")}` : "của tháng này"}
        </Text>

        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => <TaskUnScreen task={item} mutateTasks={mutateTasks} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f0f8ff', // Light background color
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 2, // For Android shadow
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
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

export default TaskCalendarComplatedScreen;
