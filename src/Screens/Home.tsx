import { StyleSheet, View } from "react-native";
import React, { ReactElement } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import Photos from "../Services/fake/photos.json";
import ImageCard from "../Components/ImageCard";

const HomeScreen = () => {
  const renderItem = ({ item, i }): ReactElement => {
    return (
      <ImageCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
    );
  };

  return (
    <View style={styles.container}>
      <MasonryList
        data={Photos}
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
