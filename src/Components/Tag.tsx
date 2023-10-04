import React from "react";
import { StyleSheet } from "react-native";
import { Badge } from "@rneui/themed";

interface Props {
  title: string;
}

const Tag: React.FC<Props> = ({ title }) => {
  return (
    <Badge
      value={title}
      textStyle={styles.tagTextStyle}
      containerStyle={styles.tagBadgeContainer}
      badgeStyle={styles.tagBadge}
    />
  );
};

export default Tag;

const styles = StyleSheet.create({
  tagsWrapper: {
    paddingTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagBadgeContainer: {
    padding: 2,
  },
  tagTextStyle: {
    fontSize: 10,
    color: "#767676",
    textTransform: "capitalize",
  },
  tagBadge: {
    height: 26,
    paddingStart: 8,
    paddingEnd: 8,
    backgroundColor: "#ddd",
  },
});
