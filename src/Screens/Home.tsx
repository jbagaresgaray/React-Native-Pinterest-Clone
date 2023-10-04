import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { ReactElement, useCallback, useState } from "react";
import MasonryList from "@react-native-seoul/masonry-list";

import ImageCard from "../Components/ImageCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../Services/Photos";
import { MAX_PER_PAGE } from "../Constant";
import { useRefreshByUser } from "../Hooks/useRefreshByUser";

const HomeScreen = () => {
  const [photosPage, setPhotosPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data: Photos, refetch } = useQuery({
    queryKey: ["photos"],
    queryFn: () =>
      fetchPhotos({
        page: photosPage,
        per_page: MAX_PER_PAGE,
        order_by: "latest",
      }),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const onRefresh = useCallback(async () => {
    setLoadingMore(false);

    setPhotosPage(1);

    refetchByUser();
  }, []);

  // const loadMorePhotos = useCallback(async () => {
  //   setLoadingMore(true);
  //   setPhotosPage((page) => page + 1);
  //   await refetchByUser();
  //   setLoadingMore(false);
  // }, []);

  const renderItem = ({ item, i }): ReactElement => {
    return (
      <ImageCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
    );
  };

  const renderFooterComponent = () => {
    if (!loadingMore) return null;

    return (
      <View
        style={{
          position: "relative",
          width: "100%",
          height: 60,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator animating size="large" color="#bbb" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MasonryList
        data={Photos}
        refreshing={isRefetchingByUser}
        onRefresh={onRefresh}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        // onEndReached={loadMorePhotos}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={renderFooterComponent}
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
