import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TopicItem from "../Components/TopicItem";
import Topics from "../Services/fake/topics.json";

const TopicsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
