
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStackNavigator from './auth-stack-navigator'
import AppStackNavigator from './app-stack-navigator'
import useUserGlobalStore from '../store/useUserGlobalStore'

const Navigation = () => {
    const {user,updateUser} = useUserGlobalStore()

  console.log('user', JSON.stringify(user, null, 1) );
  
  useEffect(() => {
    updateUser({
      email: 'hoangbinhtdmu@gmail.com',
      name: 'Hoang Binh',
    })
  }, [])

  return (
   <NavigationContainer>
    {/* <AuthStackNavigator /> */}
    {user ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigation