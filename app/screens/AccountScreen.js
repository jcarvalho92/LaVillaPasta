import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import authApi from "../api/auth";
import { useContext } from "react";
import AuthContext from "../auth/context";

function AccountScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    const response = await authApi.getUserInfo(authContext.token);
    setUser(response.data.data);
  }

  const handleLogout = async () => {
    const result = await authApi.logout();
    authContext.setUserId(0)
  }
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle= {user.email}
          onPress={() => navigation.navigate("EditUser")}
        />
      </View>
      <View style={styles.container}>
      <ListItem
          title="Cash Back"
          subTitle={"$" + user.cashBackAmount}
          IconComponent={
            <Icon
              name="cash-refund"
              backgroundColor={colors.lightSecondary}
            />
          }
        /> 
        <ListItemSeparator></ListItemSeparator>
        <ListItem
          title="My Orders"
          onPress={() => navigation.navigate("MyOrders")}
          IconComponent={
            <Icon
              name="format-list-bulleted"
              backgroundColor={colors.tertiary}
            />
          }
        /> 
      </View>
      <ListItem
        title="Logout"
        IconComponent={<Icon name="logout" backgroundColor={colors.lightPrimary} />}
        onPress={() => handleLogout()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 25,
  },
});

export default AccountScreen;
