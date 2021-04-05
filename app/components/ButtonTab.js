import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function ButtonTab({ title, onPress, style, color = "primary" }) {
  return (
    <TouchableOpacity
      style= {[styles.button, { backgroundColor: colors[color] },style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    width: "20%",
    marginBottom: 10,
    marginHorizontal: 2,
  },
  text: {
    color: colors.white,
    fontSize: 11,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default ButtonTab;
