import React from "react";
import { FlatList } from "react-native";
import useSWR from "swr";
import { ICategory } from "../../types";
import { fetcher } from "../../services/config";
import Loader from "../../components/shared/loader";
import Category from "../../components/categories/category";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import { Box, Text } from "../../utils/theme";
import CreateNewList from "../../components/categories/create-new-list";

const CategoriesScreen = () => {
  const { data, isLoading } = useSWR<ICategory[]>(
    "categories/",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  // Sắp xếp danh mục theo thời gian tạo, danh mục mới nhất sẽ ở đầu
  const sortedData = data?.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const renderItem = ({ item }: { item: ICategory }) => (
    <Category category={item} />
  );

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="4">
        <Box height={16} />
        <Text variant="textXl" fontWeight="700" mb="10">
          Danh sách danh mục
        </Text>
        <FlatList
          data={sortedData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Box />}
          keyExtractor={(item) => item._id}
        />
        <CreateNewList />
        <Box height={24} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoriesScreen;
