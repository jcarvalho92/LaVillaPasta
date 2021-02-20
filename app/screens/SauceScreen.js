import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import colors from "../config/colors";
import routes from "../navigation/routes";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Text from "../components/Text";

function SauceScreen({ navigation }) {
  const listings = [
    {
      id: 1,
      title: "Tomato Sauce",
      image: require("../assets/sauce/tomatosauce.jpeg"),
    },
    {
      id: 2,
      title: "Alfredo Sauce",
      image: require("../assets/sauce/alfredosauce.jpeg"),
    },
    {
      id: 3,
      title: "Bolognese Sauce",
      image: require("../assets/sauce/bolognesesauce.jpeg"),
    },
    {
      id: 4,
      title: "Cheddar Sauce",
      image: require("../assets/sauce/cheddarsauce.jpeg"),
    },
    {
      id: 5,
      title: "Carbonara Sauce",
      image: require("../assets/sauce/carbonarasauce.jpeg"),
    },
    {
      id: 6,
      title: "Marinara Sauce",
      image: require("../assets/sauce/marinarasauce.jpeg"),
    },
    {
      id: 7,
      title: "Pesto Sauce",
      image: require("../assets/sauce/pestosauce.jpeg"),
    },
    {
      id: 8,
      title: "Four Cheese Sauce",
      image: require("../assets/sauce/fourcheesesauce.jpeg"),
    },
  ];

  return (
        <Screen style={styles.screen}>
          <View style={styles.container}>
            <Text style={styles.title}>Choose your favorite sauce!</Text>
            <View style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(listing) => listing.id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) => (
                <ListItem
                    image={item.image}
                    title={item.title}
                    onPress={() => navigation.navigate(routes.TOPPINGS, item.title)}
                />
                )}
            />
            </View>
          </View>
        </Screen>
      );
    }
    
    const styles = StyleSheet.create
    ({
        screen: {
            backgroundColor: colors.light,
          },
          container: {
            marginVertical: 20,
          },
        title: {
         fontSize: 24,
         fontWeight: "500",
         textAlign: "center"
        },
    });
    
export default SauceScreen;
