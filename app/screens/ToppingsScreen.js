import React from "react";
import { View, FlatList, StyleSheet,Alert } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../auth/context";
import routes from "../navigation/routes";
import colors from "../config/colors";
import itemsApi from "../api/items";
import Screen from "../components/Screen";
import Button from "../components/Button";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Text from "../components/Text";

function ToppingsScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [remaining, setRemaining] = useState(5);
  const [listings, setListings] = useState([]);
  const [arrayItems, setArrayItems] = useState([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const response = await itemsApi.getToppings();
    setListings(response.data.data);
  }

  const handleClick = async (item) => {
    if(remaining == 0){
      Alert.alert(
        "Adding toppings",
        "No remaining toppings to choose!",
      );
    }
    else{
      setArrayItems([...arrayItems, item]);
      setRemaining(remaining - 1);
    }
  }

  const addItemsToCart = async () => {
    for (let index = 0; index < arrayItems.length; index++) {
      await itemsApi.postItemToCart(authContext.token,arrayItems[index]._id,1 );
    }
    navigation.navigate(routes.PASTAS);
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
                    onPress={() => handleClick(item)} 
                />
                )}
            />
            <View style={styles.buttonsContainer}>
                <Button
                    title="Add to Order" 
                     color="primary"
                     onPress={() => addItemsToCart()} 
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
