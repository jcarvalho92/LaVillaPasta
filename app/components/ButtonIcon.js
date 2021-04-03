import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import colors from "../config/colors";

function ButtonIcon({ icon, backgroundColor, size, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Icon
        backgroundColor ={backgroundColor}
        name={icon}
        size={size}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default ButtonIcon;
