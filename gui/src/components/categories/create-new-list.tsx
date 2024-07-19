import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { CategoriesNavigationType } from "../../navigation/types";
import { Box, Text, Theme } from "../../utils/theme";
import Icon from "react-native-vector-icons/FontAwesome6Pro";

const CreateNewList = () => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const theme = useTheme<Theme>();

  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {});
  };

  return (
    <Pressable onPress={navigateToCreateCategory}>
      <Box
        p="3"
        bg="white"
        borderRadius="rounded-4xl"
        shadowColor="gray600"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={10}
        flexDirection="row"
        alignItems="center"
        mb="2" // Giảm khoảng cách dưới
        style={styles.container}
      >
        <Icon name="plus" size={20} color={theme.colors.primary} />
        <Text variant="textLg" fontWeight="600" color="gray650" ml="2">
          Thêm
        </Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110, // Đặt chiều rộng cụ thể để làm cho phần tử ngắn lại
    marginLeft: 'auto', // Đẩy phần tử sang bên phải
    borderColor:'#6366f1',
    borderWidth:1
  },
});

export default CreateNewList;
