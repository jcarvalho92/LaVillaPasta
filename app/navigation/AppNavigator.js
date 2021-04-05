import React  from "react";
import { useState } from "react";
import { StyleSheet, View }  from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuNavigator from "./MenuNavigator";
import AccountScreen from "../screens/AccountScreen";
import CartScreen from "../screens/CartScreen";
import AddItemScreen from "../screens/AddItemScreen";
import OrdersStatusScreen from "../screens/OrdersStatusScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useContext } from "react";
import AuthContext from "../auth/context";

function AppNavigator() {
  const authContext = useContext(AuthContext);
  const BottomTab = createBottomTabNavigator();

  const tabNavigatorUI = () => {

    if(authContext.user.role != "admin"){
      return <BottomTab.Navigator>
    
      <BottomTab.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="silverware" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      
    </BottomTab.Navigator>
      
    }else{
      return <BottomTab.Navigator>
    
      <BottomTab.Screen
        name="Orders"
        component={OrdersStatusScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="playlist-edit" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Items"
        component={AddItemScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Logout"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
    }
  }


  return (
    <View style={styles.container}>
      {tabNavigatorUI()}
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
  },
});

export default AppNavigator;

