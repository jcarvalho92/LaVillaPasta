import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  email: Yup.string().required().email().label("Email"),
  mobile: Yup.string().required().min(10).label("Mobile Number"),
  address: Yup.string().required().min(3).label("Address"),
  city: Yup.string().required().min(3).label("City"),
  postalCode: Yup.string().required().min(6).label("Postal Code"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen(props) {
  return (
    <Screen style={styles.container}>
    <Form
      initialValues={{ name: "", email: "", mobile: "",address: "", city: "",postalCode: "", password: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={validationSchema}
    >
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
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
            autoCorrect={false}
            icon="phone"
            name="mobile"
            placeholder="Mobile Number"
          />

          <FormField
            autoCorrect={false}
            icon="home"
            name="address"
            placeholder="Address"
          />

          <FormField
            autoCorrect={false}
            icon="home"
            name="apt"
            placeholder="Address Line 2"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="home"
            name="city"
            placeholder="City"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="home"
            name="postalCode"
            placeholder="Postal code"
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
      <SubmitButton title="Register" />
    </Form>
    
  </Screen>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
