import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PastaScreen from "../screens/PastaScreen";

const Stack = createStackNavigator();

const MenuNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Pasta" component={PastaScreen} />
  </Stack.Navigator>
);

export default MenuNavigator;
