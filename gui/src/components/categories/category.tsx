
import React from "react"
import Icon from 'react-native-vector-icons/Entypo';
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { FadeInRight, FadeInLeft } from "react-native-reanimated"
import { CategoriesNavigationType } from "../../navigation/types"
import { ICategory } from "../../types"
import { AnimatedBox, Box, Text } from "../../utils/theme"
type CategoryProps = {
  category: ICategory
}

const Category = ({ category }: CategoryProps) => {
  const navigation = useNavigation<CategoriesNavigationType>()
  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {
      category: category,
    })
  }

  const navigateToCategoryScreen = () => {
    navigation.navigate("Category", {
      id: category._id,
    })
  }

  return (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable onPress={navigateToCategoryScreen}>
        <Box bg="lightGray" p="4" borderRadius="rounded-5xl">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flexDirection="row">
              <Text variant="textBase" fontWeight="600" mr="3">
                {category.icon.symbol}
              </Text>
              <Text variant="textBase" fontWeight="600">
                {category.name}
              </Text>
            </Box>
            <Pressable onPress={navigateToCreateCategory}>
              <Icon name="dots-three-vertical" size={16} />
            </Pressable>
          </Box>
        </Box>
      </Pressable>
    </AnimatedBox>
  )
}

export default Category
