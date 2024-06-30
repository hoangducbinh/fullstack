import {StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from './src/components/shared/button'
import { ThemeProvider } from '@shopify/restyle'
import theme, { Text } from './src/utils/theme'
import Navigation from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
      <Navigation />
      <StatusBar
      translucent
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