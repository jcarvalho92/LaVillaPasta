import React from "react";
import { View, FlatList, StyleSheet ,TouchableOpacity, Alert} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ordersApi from "../api/orders";
import itemsApi from "../api/items";
import Screen from "../components/Screen";
import Button from "../components/Button";
import ListItem from "../components/lists/ListItemCart";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import Text from "../components/Text";
import { useContext } from "react";
import AuthContext from "../auth/context";

function CartScreen({ route }) {
  const authContext = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const response = await ordersApi.getOrderPerUser(authContext.userId);
    setListings(response.data.data);
  }

  const handleDelete = async (item) => {
    await ordersApi.deleteItemFromOrder(authContext.token, item.id);
  };

  const deleteItems = () => {
    Alert.alert(
      "Remove Items",
      "Are you sure you want to remove all items?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteAll() }
      ],
      { cancelable: false }
    );
  };

  const deleteAll = async () => {
    var i = 0;
      for(i=0; i < listings.length; i++){
       await ordersApi.deleteItemFromOrder(authContext.token, listings[i]._id);
      }
  };

  return (
        <Screen style={styles.screen}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.removeAll} onPress={() => deleteItems()}>
                <Icon 
                 name="cart-remove"
                 backgroundColor={colors.mediumPrimary}
                />
              </TouchableOpacity>
            <Text style={styles.title}>Your Cart</Text>
            <View style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(listing) => listing._id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                extraData={listings}
                refreshing={refreshing}
                onRefresh={loadListings()}
                renderItem={({ item }) => (
                <ListItem
                    imageUrl= {itemsApi.getPhoto(item.item.image)}
                    title={item.item.title}
                    subTitle={item.item.description}
                    unitPrice={item.item.unitPrice}
                    renderRightActions={() => (
                      <ListItemDeleteAction onPress={() => handleDelete(item)} />
                    )}
                />
                )}
            />
            
          </View>
          
          </View>
          <View style={styles.buttonsContainer}>
              <View style={styles.containerRowDirection}>
                <Text style={styles.subtitle}>Total: </Text>
                <Text style={styles.subtitle}> </Text>
              </View>
                
                
                <Button
                    title="Checkout" 
                     color="primary"
                />
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
        containerRowDirection: {
            flexDirection: "row",
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
            position: "absolute",
            bottom: 0,
            width: "100%",
          },
          removeAll: {
            alignSelf: 'flex-end',
            paddingHorizontal: 10,

          }
         
    });


export default CartScreen;
