import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PastaScreen from "../screens/PastaScreen";
import SauceScreen from "../screens/SauceScreen";
import ToppingsScreen from "../screens/ToppingsScreen";

const Stack = createStackNavigator();

const MenuNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Pasta" component={PastaScreen} />
    <Stack.Screen name="Sauce" component={SauceScreen} />
    <Stack.Screen name="Toppings" component={ToppingsScreen} />
  </Stack.Navigator>
);

export default MenuNavigator;
