import { Button, View,  } from 'react-native'
import React from 'react'
import { Box,Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../navigation/types'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'


const HomeScreen = () => {

  return (
    <SafeAreaWrapper>
       <Box>
         <Text>Home</Text>
        </Box>
    </SafeAreaWrapper>
  
  )
}

export default HomeScreen