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

function CartScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const load = navigation.addListener('focus', () => {
      loadListings();
    });
    return load;
  }, [navigation]);

  const loadListings = async () => {
    const response = await ordersApi.getSubmittedOrder(authContext.userId);
    setListings(response.data.data);
  }

  const handleDelete = async (item) => {
   if(item.item.type != "pasta"){
     var newListings = listings.filter(x => x.id !== item.id);
     setListings(newListings);
     await ordersApi.deleteItemFromOrder(authContext.token, item.id);
   }
   else{

     await ordersApi.deleteItemFromOrder(authContext.token, item.id);

     deleteSauce();
     deleteToppings();
     
   }
 
  };

  const deleteSauce = async () => {
    var sauceToDelete = listings.filter(x => x.item.type == "sauce"); 

   await ordersApi.deleteItemFromOrder(authContext.token, sauceToDelete[0].id);
  }
  const deleteToppings = async () => {
    var toppingsToDelete = listings.filter(x => x.item.type == "topping"); 

   for (let index = 0; index < toppingsToDelete.length; index++) {
    await ordersApi.deleteItemFromOrder(authContext.token, toppingsToDelete[index].id);
   }
   loadListings();
  }


  const deleteItems = () => {
    Alert.alert(
      "Remove Items",
      "Are you sure you want to remove all items?",
      [
        {
          text: "Cancel",
        },
        { text: "Yes", onPress: () => deleteAll() }
      ],
      { cancelable: false }
    );
  };

  const deleteAll = async () => {
    setListings([]);
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
                renderItem={({ item }) => (
                  <ListItem
                      order = {item}
                      imageUrl= {itemsApi.getPhoto(item.item.image)}
                      title={item.item.title} 
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
