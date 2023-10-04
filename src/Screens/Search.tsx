import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, useCallback, useState } from "react";
import { SearchBar, useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageCard from "../Components/ImageCard";
import MasonryList from "@react-native-seoul/masonry-list";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import { useQuery } from "@tanstack/react-query";
import { MAX_PER_PAGE } from "../Constant";
import { searchPhotos } from "../Services/Photos";
import { useRefreshByUser } from "../Hooks/useRefreshByUser";

const SearchScreen = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState<string>("");

  const { data: Photos, refetch } = useQuery({
    queryKey: ["search"],
    queryFn: () =>
      searchPhotos({
        query: !isEmpty(search) ? search : "",
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: "latest",
      }),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const updateSearch = (search) => {
    setSearch(search);
    onSearchingDebounce(search);
  };

  const onSearchingDebounce = useCallback(
    debounce(async (value) => {
      console.log("Search to API Here : ", value);
      if (value && !isEmpty(value)) {
        console.log("searchUsers");
        refetchByUser();
      }
    }, 600),
    []
  );

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
        {Photos && !isEmpty(Photos?.results) && (
          <MasonryList
            data={Photos?.results}
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            keyExtractor={(item): string => item?.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        )}
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
