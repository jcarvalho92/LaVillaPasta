import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../auth/context";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import usersApi from "../api/users";
import jwtDecode from "jwt-decode";
import Screen from "../components/Screen";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../components/Text";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required().max(10).label("Mobile Number"),
});

function EditUserScreen(props) {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({address:{}});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    loadUserInfo();

  }, []);

  const loadUserInfo = async () => {
    setLoading(true)
    const response = await authApi.getUserInfo(authContext.token);
    
    setUser(response.data.data);
    setLoading(false);

  }

  const handleSubmit = async ({phone,address}) => {
    const result = await usersApi.updateUser
    (
      authContext.userId,
      phone,
      address
    );
    if(result.data.success){
      Alert.alert(
        "Updating Personal Info.",
        "Succeded!",
      );
    }
    else{
      Alert.alert(
        "Updating Personal Info.",
        "Failed!",
      );
    }
  }

  return (

    <Screen style={styles.container}>
      {isLoading ? ( 
      <AppText>Loading...</AppText> )
      :
      <ScrollView>
        <Form
          initialValues=
          {{ 
            phone: user.phone,
            address: {
              streetNumber: user.address ? user.address.streetNumber : "",
              streetName: user.address ? user.address.streetName : "",
              apartmentNumber: user.address ? user.address.apartmentNumber : "",
              city: user.address ? user.address.city : "",
              postalCode: user.address ? user.address.postalCode : "",
            }, 
          }}
         onSubmit={handleSubmit}
         validationSchema={validationSchema}
        >
          

          <FormField
            autoCorrect={false}
            icon="phone"
            name="phone"
            textContentType="password"
            keyboardType="phone-pad"
            placeholder="mobile"
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
            keyboardType="numeric"
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

      <SubmitButton title="Update" />
    </Form>
      </ScrollView>
}
  </Screen>
 
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default EditUserScreen;
