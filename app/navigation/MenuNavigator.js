import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PastaScreen from "../screens/PastaScreen";
import SauceScreen from "../screens/SauceScreen";
import ToppingsScreen from "../screens/ToppingsScreen";
import ComboScreen from "../screens/ComboScreen";
import SaladScreen from "../screens/SaladScreen";
import DessertScreen from "../screens/DessertScreen";
import DrinksScreen from "../screens/DrinksScreen";

const Stack = createStackNavigator();

const MenuNavigator = () => (
  <Stack.Navigator  screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Pastas" component={PastaScreen} />
    <Stack.Screen name="Sauces" component={SauceScreen} />
    <Stack.Screen name="Toppings" component={ToppingsScreen} />
    <Stack.Screen name="Combos" component={ComboScreen} />
    <Stack.Screen name="Salads" component={SaladScreen} />
    <Stack.Screen name="Desserts" component={DessertScreen} />
    <Stack.Screen name="Drinks" component={DrinksScreen} />
  </Stack.Navigator>
);

export default MenuNavigator;



