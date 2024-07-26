import { AppState, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from './src/components/shared/button'
import { ThemeProvider } from '@shopify/restyle'
import theme, { Text } from './src/utils/theme'
import Navigation from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SWRConfig } from 'swr'
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';


messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    'Notification caused app to open from background state:',
    remoteMessage.notification,
  );
});

messaging().onMessage(remoteMessage => {
  console.log('A new FCM message arrived!', remoteMessage);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // Xử lý thông báo ở đây
});


const App = () => {
  useEffect(()=>{
    const requestUserPermission = async () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
     const authStatus = await messaging().requestPermission();
     const enabled =
       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

     if (enabled) {
      // console.log('Authorization status:', authStatus);
       const token = await messaging().getToken();
      // console.log('FCM token:',token);
     }
   };
   requestUserPermission();
   },[])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SWRConfig
          value={{
            provider: () => new Map(),
            isVisible: () => { return true },
            initFocus(callback) {
              let appState = AppState.currentState

              const onAppStateChange = (nextAppState:any) => {
                /* If it's resuming from background or inactive mode to active one */
                if (appState.match(/inactive|background/) && nextAppState === 'active') {
                  callback()
                }
                appState = nextAppState
              }

              // Subscribe to the app state change events
              const subscription = AppState.addEventListener('change', onAppStateChange)

              return () => {
                subscription.remove()
              }
            }
          }}
        >
          <Navigation />
        </SWRConfig>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      </SafeAreaProvider>
    </ThemeProvider>

  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})