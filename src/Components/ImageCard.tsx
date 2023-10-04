import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import { Image } from "expo-image";

type ImageCardProps = { item: any; style: StyleProp<ViewStyle> };

const ImageCard: React.FC<ImageCardProps> = ({ item, style }) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);

  return (
    <View key={item.id} style={[styles.ImageContainer, style]}>
      <Image
        source={item?.urls?.regular}
        placeholder={item?.blurhash}
        style={{
          height: randomBool ? 150 : 280,
          alignSelf: "stretch",
        }}
        contentFit="cover"
      />
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  ImageContainer: {
    marginTop: 12,
    flex: 1,
    overflow: "hidden",
    borderRadius: 10,
  },
});
