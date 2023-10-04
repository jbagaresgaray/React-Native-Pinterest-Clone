import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CollectionItem from "../../Components/CollectionItem";
import CollectionsHeader from "./CollectionHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "../../Services/Photos";
import { MAX_PER_PAGE } from "../../Constant";
import { useRefreshByUser } from "../../Hooks/useRefreshByUser";

const CollectionScreen = () => {
  const { data: Collections, refetch } = useQuery({
    queryKey: ["collections"],
    queryFn: () =>
      fetchCollections({
        page: 1,
        per_page: MAX_PER_PAGE,
      }),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const renderItem = ({ item }: any) => <CollectionItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        ListHeaderComponent={<CollectionsHeader />}
        data={Collections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CollectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
