import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { useState } from "react/cjs/react.development";
import AuthContext from "./app/auth/context";

export default function App() {
  const [userId, setUserId] = useState();
  return (
    <AuthContext.Provider value={{userId, setUserId}}>
    <NavigationContainer theme={navigationTheme}>
      {userId ? <AppNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
