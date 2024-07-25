import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";
import { View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStackNavigator from "./home-stack-navigator";
import CategoriesStackNavigator from "./categories-stack-navigator";
import CompletedScreen from "../screens/completed-screen";
import TodayScreen from "../screens/today-screen";
import TaskCalendarScreen from "../screens/task-calendar";
import theme from '../utils/theme';

const Tab = createBottomTabNavigator();

interface CustomTabBarIconProps {
  name: string;
  color: string;
}

const CustomTabBarIcon = ({ name, color }: CustomTabBarIconProps) => (
  <Icon name={name} size={24} color={color} />
);

const CustomTabButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      alignItems: "center",
      justifyContent: 'center',
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: Platform.OS === "ios" ? 50 : 60,
        height: Platform.OS === "ios" ? 50 : 60,
        top: Platform.OS === "ios"? -10 : -20,
        borderRadius: Platform.OS === "ios"? 25: 30,
        backgroundColor:theme.colors.pink500,
        alignItems: "center",
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.pink500,
        tabBarInactiveTintColor: theme.colors.purple900,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case 'HomeStack':
              iconName = 'home';
              break;
            case 'Completed':
              iconName = 'check-circle-outline';
              break;
            case 'Today':
              iconName = 'calendar-today';
              break;
            case 'CategoriesStack':
              iconName = 'format-list-bulleted';
              break;
            case 'Settings':
              iconName = 'calendar-month';
              break;
            default:
              iconName = 'help-circle';
          }
          return <CustomTabBarIcon name={iconName} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={{ title: "Hoàn thành" }}
      />
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          title: "",
         // tabBarButton: (props) => <CustomTabButton {...props}/>,
          // tabBarIcon: ({ color }) => (
          //   <Icon name="calendar-today" color={color} size={40} />
          // ),
          tabBarIcon: ({ color }) => {
            return (
              <View style={{
                width: Platform.OS === "ios" ? 50 : 60,
                height: Platform.OS === "ios" ? 50 : 60,
                top: Platform.OS === "ios"? -10 : -10,
                borderRadius: Platform.OS === "ios"? 25: 30,
                backgroundColor:theme.colors.pink500,
                alignItems: "center",
                justifyContent: 'center',
                }}>
                <Icon
                  name="calendar-today"
                  color={'#ffff'}
                  size={40}
                />
              </View>
            );
          }
        }}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={{ title: "Danh mục" }}
      />
      <Tab.Screen
        name="Settings"
        component={TaskCalendarScreen}
        options={{ title: "Lịch trình" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffff',
    borderTopWidth: 0,
    elevation: 1,
    shadowColor: '#fae8ff',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
