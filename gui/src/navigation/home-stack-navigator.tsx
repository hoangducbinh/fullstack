import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {HomeStackParamList } from './types'
import HomeScreen from '../screens/home-screen'
import EditTaskScreen from '../screens/edit-task'

const Stack = createStackNavigator<HomeStackParamList>()


const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
        options={{
            headerShown: false
        }}
        />
        <Stack.Screen name="EditTask" component={EditTaskScreen}
         options={{
            headerShown: false
        }}
        />

    </Stack.Navigator> 
  )
}

export default HomeStackNavigator