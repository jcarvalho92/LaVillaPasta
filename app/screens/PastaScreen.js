import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";

const listings = [
  {
    id: 1,
    title: "Fettuccine",
    price: 15,
    image: require("../assets/pasta/fettuccine.jpg"),
  },
  {
    id: 2,
    title: "Ravioli",
    price: 15,
    image: require("../assets/pasta/ravioli.jpg"),
  },
  {
    id: 3,
    title: "Spagetti",
    price: 15,
    image: require("../assets/pasta/spagetti.jpg"),
  },
  {
    id: 3,
    title: "Penne",
    price: 15,
    image: require("../assets/pasta/penne.jpeg"),
  },
];

function ListingsScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
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
});

export default ListingsScreen;
