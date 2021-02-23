import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import colors from "../config/colors";
import itemsApi from "../api/items";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Button from "../components/Button";
import ButtonTab from  "../components/ButtonTab";
import Screen from "../components/Screen";
import { useState } from "react";
import { useEffect } from "react";


function DrinksScreen({ navigation }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const response = await itemsApi.getDrinks();
    setListings(response.data.data);
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
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            imageUrl= {itemsApi.getPhoto(item.image)}
            title={item.title}
            subTitle={"$" + item.unitPrice}
          />
        )}
      />
      <View style={styles.buttonsContainer}>
        <Button
            title="Add to Order" 
            color="primary"
        />
      </View>
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

export default DrinksScreen;
