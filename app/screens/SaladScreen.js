import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";

import colors from "../config/colors";
import itemsApi from "../api/items";
import Card from "../components/Card";
import ButtonTab from  "../components/ButtonTab";
import Screen from "../components/Screen";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../auth/context";

function SaladScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const response = await itemsApi.getSalads();
    setListings(response.data.data);
  }
  
  const addItemToCart = async (item) => {
    const result = await itemsApi.postItemToCart(authContext.token,item._id,1 )

    if(result.data.success){
      Alert.alert(
        "Adding Items",
        "Added it to your cart!",
      );
    }
    else{
      Alert.alert(
        "Adding Items",
        "Failed to add it to your cart!",
      );
    }
  }
  
  return (
    <Screen style={styles.screen}>
      <View style={ {flexDirection: "row"}}>
        <ButtonTab title="Pastas" onPress={() => navigation.navigate("Pastas")}></ButtonTab> 
        <ButtonTab title="Combos" onPress={() => navigation.navigate("Combos")}></ButtonTab> 
        <ButtonTab title="Salads" onPress={() => navigation.navigate("Salads")}></ButtonTab> 
        <ButtonTab title="Desserts" onPress={() => navigation.navigate("Desserts")}></ButtonTab> 
        <ButtonTab title="Drinks" onPress={() => navigation.navigate("Drinks")}></ButtonTab> 
      </View>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.unitPrice}
            imageUrl= {itemsApi.getPhoto(item.image)}
            onPress={ () => addItemToCart(item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
});

export default SaladScreen;
