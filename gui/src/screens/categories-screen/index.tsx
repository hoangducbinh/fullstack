
import React from 'react'
import { Box,Text } from '../../utils/theme'
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper'
import useSWR from 'swr'
import { fetcher } from '../../services/config'
import Loader from '../../components/shared/loader'
import { ICategory } from '../../types'
import { FlatList } from 'react-native'
import Category from '../../components/categories/category'
import CreateNewList from '../../components/categories/create-new-list'




const CategoriesScreen = () => {

  const {data,error,isLoading} = useSWR<ICategory[]>("categories",fetcher)

  if(isLoading) {
   return <Loader />
  }

  const renderItem =({item}:{item:ICategory}) => (
   <Category category={item} />
  )


  return (
    <SafeAreaWrapper>
   <Box flex={1} px='4'>
         <Text variant='textXl' fontWeight="700" mb='10'>
          Categories
          </Text>
          <FlatList
            data ={data}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <Box height={10}  />}
            keyExtractor={(item) => item._id.toString()}
          />
          <CreateNewList />
          
   </Box>
   </SafeAreaWrapper>
  )
}

export default CategoriesScreen