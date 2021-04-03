import React  from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuNavigator from "./MenuNavigator";
import AccountScreen from "../screens/AccountScreen";
import CartScreen from "../screens/CartScreen";
import AddItemScreen from "../screens/AddItemScreen";
import { useContext } from "react";
import AuthContext from "../auth/context";


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
    <BottomTab.Screen
      name="Items"
      component={AddItemScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus" color={color} size={size} />
        ),
      }}
    />
  </BottomTab.Navigator>
);

export default AppNavigator;
