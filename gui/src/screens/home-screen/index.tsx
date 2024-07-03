import { Button, View,  } from 'react-native'
import React from 'react'
import { Box,Text } from '../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationType } from '../../navigation/types'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import useSWR from 'swr'
import { fetcher } from '../../services/config'
import CreateNewList from '../../components/categories/create-new-list'


const HomeScreen = () => {

  const {data ,isLoading} = useSWR('categories',fetcher)
  console.log(`data`,JSON.stringify(data,null,2));
  

  return (
    <SafeAreaWrapper>
       <Box>
         <Text>Home</Text>
        </Box>
    </SafeAreaWrapper>
  
  )
}

export default HomeScreen