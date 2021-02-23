import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import defaultStyles from "../config/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import authApi from "../api/auth";
import { useContext } from "react";
import AuthContext from "../auth/context";

function Screen({ children, style }) {
  const authContext = useContext(AuthContext);
  const handleLogout = async () => {
    const result = await authApi.logout();
    authContext.setUserId(0)
  }
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleLogout()}
      >
       <MaterialCommunityIcons
          name="logout"
          size={25}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
  iconContainer: {
    alignSelf: 'flex-end',
  },
  icon: {
    paddingHorizontal: 15,  
  }
});

export default Screen;
