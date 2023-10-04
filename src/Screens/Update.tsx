import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CollectionScreen from "./Collections/Collections";
import TopicsScreen from "./Topics";
import { SafeAreaView } from "react-native-safe-area-context";

const renderScene = SceneMap({
  collections: CollectionScreen,
  topics: TopicsScreen,
});

const UpdateScreen = () => {
  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#000" }}
      labelStyle={{
        color: "#000",
      }}
      style={{ backgroundColor: "#fff" }}
    />
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "collections", title: "Collections" },
    { key: "topics", title: "Topics" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
