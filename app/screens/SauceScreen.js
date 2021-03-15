import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import routes from "../navigation/routes";
import itemsApi from "../api/items";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Text from "../components/Text";

function SauceScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const response = await itemsApi.getSauces();
    setListings(response.data.data);
  }

  const addItemToCart = async (item) => {
    const result = await itemsApi.postItemToCart(authContext.token,item._id,1 );
    navigation.navigate(routes.TOPPINGS);
  }
  return (
        <Screen style={styles.screen}>
          <View style={styles.container}>
            <Text style={styles.title}>Choose your favorite sauce!</Text>
            <View style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(listing) => listing._id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) => (
                <ListItem
                    imageUrl= {itemsApi.getPhoto(item.image)}
                    title={item.title}
                    onPress={ () => addItemToCart(item)}
                    style={styles.listItem}
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
        listItem: {
          padding: 2
        }
    });
    
export default SauceScreen;
