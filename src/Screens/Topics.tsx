import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import TopicItem from "../Components/TopicItem";
import { useRefreshByUser } from "../Hooks/useRefreshByUser";
import { useQuery } from "@tanstack/react-query";
import { fetchTopics } from "../Services/Photos";
import { MAX_PER_PAGE } from "../Constant";

const TopicsScreen = () => {
  const { data: Topics, refetch } = useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      fetchTopics({
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: "position",
      }),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const renderItem = ({ item }: any) => (
    <TopicItem
      title={item.title}
      description={item.description}
      cover_photo={item.cover_photo}
      owners={item?.owners[0]}
      total_photos={item?.total_photos}
      status={item?.status}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        data={Topics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TopicsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
