import { Button, View,  } from 'react-native'
import React from 'react'
import { Box,Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../navigation/types'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'


const EditTaskScreen = () => {

  return (
    <SafeAreaWrapper>

    <Box>
          <Text>Edit Task Screen</Text>
    </Box>
    </SafeAreaWrapper>
  )
}

export default EditTaskScreen