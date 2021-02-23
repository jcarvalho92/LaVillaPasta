import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import colors from "../config/colors";
import itemsApi from "../api/items";
import Screen from "../components/Screen";
import Button from "../components/Button";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Text from "../components/Text";

function ToppingsScreen({ route }) {
  const [remaining, setRemaining] = useState(5);
  const [itemsClicked, setItemsClicked] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const response = await itemsApi.getToppings();
    setListings(response.data.data);
  }

  const handleClick = () => {
    if(remaining == 0){
      alert("No remaining toppings to choose!")
    }
    else{
      setRemaining(remaining - 1);
    }
    
  }
  return (
        <Screen style={styles.screen}>
          <View style={styles.container}>
            <Text style={styles.title}>Choose your favorite Toppings!</Text>
            <Text style={styles.subtitle}>Remaining: {remaining}</Text>
            <View style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(listing) => listing._id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) => (
                <ListItem
                    imageUrl= {itemsApi.getPhoto(item.image)}
                    title={item.title}
                    onPress={() => handleClick()} 
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
