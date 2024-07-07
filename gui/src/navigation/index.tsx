
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import AppStackNavigator from "./app-stack-navigator"
import AuthStackNavigator from "./auth-stack-navigator"
import useUserGlobalStore from "../store/useUserGlobalStore"

const Navigation = () => {
  const { user } = useUserGlobalStore()

  return (
    <NavigationContainer>
      {/* <AuthStackNavigator /> */}
      {user ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigation
