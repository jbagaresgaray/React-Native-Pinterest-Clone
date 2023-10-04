import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CollectionsHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTitle}>Collections</Text>
      </View>
    </View>
  );
};

export default CollectionsHeader;

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
  },
  categoryHeader: {
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  categoryHeaderTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
});
