import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {CategoriesStackParamList } from './types'
import CategoriesScreen from '../screens/categories-screen'
import CategoryScreen from '../screens/category-screen'

const Stack = createStackNavigator<CategoriesStackParamList>()


const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Categories" component={CategoriesScreen}/>
        <Stack.Screen name="Category" component={CategoryScreen}/>

    </Stack.Navigator> 
  )
}

export default CategoryStackNavigator