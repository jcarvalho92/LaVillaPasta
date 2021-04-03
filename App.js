import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { useState } from "react/cjs/react.development";
import AuthContext from "./app/auth/context";

export default function App() {
  const [userId, setUserId] = useState();
  //const [user, setUser] = useState({});
  const [token, setToken] = useState();
  return (
    <AuthContext.Provider value={{userId, setUserId, token, setToken}}>
    <NavigationContainer theme={navigationTheme}>
      {userId ? <AppNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
