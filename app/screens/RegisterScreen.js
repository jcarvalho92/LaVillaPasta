import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import jwtDecode from "jwt-decode";
import Screen from "../components/Screen";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
import { useContext } from "react";
import AuthContext from "../auth/context";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().max(10).label("Mobile Number"),
  password: Yup.string().required().min(6).label("Password"),
});

function RegisterScreen(props) {
  const authContext = useContext(AuthContext);
  const handleSubmit = async ({name, email,phone,password,address}) => {
    const result = await authApi.register
    (
      name, 
      email,
      phone,
      password,
      address
    );
    const token = result.data.token;
    const jwt = jwtDecode(token);
    const userId = jwt.id
    authContext.setUserId(userId)
    authContext.setToken(token)
  }

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Form
          initialValues=
          {{ 
            name: "", 
            email: "", 
            phone: "",
            password: "",
            address: {
              streetNumber: "",
              streetName: "",
              apartmentNumber: "",
              city: "",
              postalCode: "",
            }, 
          }}
         onSubmit={handleSubmit}
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
            name="phone"
            placeholder="Mobile Number"
          />

          <FormField
            autoCorrect={false}
            icon="home"
            name="address.streetNumber"
            placeholder="Street Number"
          />

          <FormField
            autoCorrect={false}
            icon="home"
            name="address.streetName"
            placeholder="Street Name"
          />

          <FormField
            autoCorrect={false}
            icon="home"
            name="address.apartmentNumber"
            placeholder="Apartament Number"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="home"
            name="address.city"
            placeholder="City"
          /> 

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="home"
            name="address.postalCode"
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
      </ScrollView>
  </Screen>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
