import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CollectionItem from "../../Components/CollectionItem";
import Collections from "../../Services/fake/collections.json";
import CollectionsHeader from "./CollectionHeader";

const CollectionScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: any) => <CollectionItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
