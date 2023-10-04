import { StyleSheet, View } from "react-native";
import React, { ReactElement } from "react";
import MasonryList from "@react-native-seoul/masonry-list";

import ImageCard from "../Components/ImageCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../Services/Photos";
import { MAX_PER_PAGE } from "../Constant";
import { useRefreshByUser } from "../Hooks/useRefreshByUser";

const HomeScreen = () => {
  const { data: Photos, refetch } = useQuery({
    queryKey: ["photos"],
    queryFn: () =>
      fetchPhotos({
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: "latest",
      }),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const renderItem = ({ item, i }): ReactElement => {
    return (
      <ImageCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
    );
  };

  return (
    <View style={styles.container}>
      <MasonryList
        data={Photos}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
});
