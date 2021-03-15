import React from "react";
import {StyleSheet, View } from "react-native";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import authApi from "../api/auth";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import ErrorMessage from "../components/forms/ErrorMessage";
import SubmitButton from "../components/forms/SubmitButton";
import { useState } from "react/cjs/react.development";
import { useContext } from "react";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  //email: Yup.string().required().email().label("Email"),
  //password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const authContext = useContext(AuthContext);
  const [loginFailed, SetLoginFailed] = useState(false);

  const handleSubmit = async ({email, password}) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return SetLoginFailed(true);
    SetLoginFailed(false);
    
    const token = result.data.token;
    const jwt = jwtDecode(token);
    const userId = jwt.id
    authContext.setUserId(userId)
    authContext.setToken(token)
  }
  
  return (
    <View style={styles.container}>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid email and/or password" visible={loginFailed}/>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
  },
});

export default LoginScreen;
