import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuNavigator from "./MenuNavigator";
import AccountScreen from "../screens/AccountScreen";

const BottomTab = createBottomTabNavigator();

const AppNavigator = () => (
  
  <BottomTab.Navigator>
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
      name="Checkout"
      component={AccountScreen}
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
);

export default AppNavigator;
