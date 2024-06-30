import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AppStackParamList} from './types'
import BottomTabNavigator from './bottom-tab-navigator'

const Stack = createStackNavigator<AppStackParamList>()


const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Root' component={BottomTabNavigator} 
        options={{
            headerShown: false
        }}
        />  
    </Stack.Navigator> 
  )
}

export default AppStackNavigator