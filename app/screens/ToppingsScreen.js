import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import Button from "../components/Button";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Text from "../components/Text";

function ToppingsScreen({ route }) {
  const listings = [
    {
      id: 1,
      title: "Shrimp",
      image: require("../assets/toppings/shrimp.jpeg"),
    },
    {
      id: 2,
      title: "Grilled Chicken",
      image: require("../assets/toppings/grilledchicken.jpeg"),
    },
    {
      id: 3,
      title: "Bacon",
      image: require("../assets/toppings/bacon.jpeg"),
    },
    {
      id: 4,
      title: "Onions",
      image: require("../assets/toppings/onion.jpeg"),
    },
    {
      id: 5,
      title: "Tomatoes",
      image: require("../assets/toppings/tomatoes.jpeg"),
    },
  ];

  return (
        <Screen style={styles.screen}>
          <View style={styles.container}>
            <Text style={styles.title}>Choose your favorite Toppings!</Text>
            <Text style={styles.subtitle}>Remaining: 4</Text>
            <View style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(listing) => listing.id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) => (
                <ListItem
                    image={item.image}
                    title={item.title}
                />
                )}
            />
            <View style={styles.buttonsContainer}>
                <Button
                    title="Add to Order" 
                     color="primary"
                />
             </View>
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
        subtitle: {
            marginVertical: 10,
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center"
        },
        buttonsContainer: {
            padding: 20,
            width: "100%",
          },
    });


export default ToppingsScreen;
