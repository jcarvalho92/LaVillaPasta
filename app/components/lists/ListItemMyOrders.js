import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";

function ListItemMyOrders({
  title,
  subTitle,
  imageUrl,
  IconComponent,
  onPress,
  style
}) {
  return (

      <TouchableHighlight underlayColor={colors.medium} onPress={onPress}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItemMyOrders;
