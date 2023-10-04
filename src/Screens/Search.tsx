import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, useState } from "react";
import { SearchBar, useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageCard from "../Components/ImageCard";
import MasonryList from "@react-native-seoul/masonry-list";
import Photos from "../Services/fake/photos.json";

const SearchScreen = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState<string>("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const renderItem = ({ item, i }): ReactElement => {
    return (
      <ImageCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HeaderContainer}>
        <SearchBar
          lightTheme
          showCancel
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={{
            borderWidth: 0,
            backgroundColor: theme.colors.white,
          }}
        />
      </View>
      <View style={styles.ContentContainer}>
        <MasonryList
          data={Photos}
          keyExtractor={(item): string => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeaderContainer: {},
  ContentContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
