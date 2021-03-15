import React from "react";
import {StyleSheet, View,FlatList,Alert } from "react-native";
import Moment from 'moment';
import colors from "../config/colors";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AppText from "../components/Text";
import ordersApi from "../api/orders";
import itemsApi from "../api/items";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../auth/context";

function MyOrdersScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [previousOrders, setPreviousOrders] = useState([]);
  Moment.locale('en');

   useEffect(() => {
    const load = navigation.addListener('focus', () => {
      loadSubmittedOrder();
      loadDeliveredOrder();
    });
    return load;
  }, [navigation]);

  const loadSubmittedOrder = async () => {
    setLoading(true);
    const response = await ordersApi.getSubmittedOrder(authContext.userId);
    const count = response.data.count;
    const result = response.data.data;
    
    let qtd = 0;
    let tot = 0;

    for (let index = 0; index < count; index++) {
      qtd = qtd + result[index].quantity;
      tot = tot + (result[index].quantity * result[index].item.unitPrice);
    }

    setQuantity(qtd);
    setTotal(tot);

    setLoading(false);
  }

  const loadDeliveredOrder = async () => {
    const response = await ordersApi.getDeliveredOrder(authContext.userId);
    setPreviousOrders(response.data.data);
  }

  const reorderConfirmation = (item) => {
    Alert.alert(
      "Reorder Items",
      "Do you want to add these items to cart ?",
      [
        {
          text: "Cancel"
        },
        { text: "Yes", onPress: () => reorderItems(item) }
      ],
      { cancelable: false }
    );
  };

  const reorderItems = async (item) => {
    const response = await itemsApi.postItemToCart(authContext.token, item.item.id, 1);
    loadSubmittedOrder();
  }
  

  return (
      <Screen style={styles.screen}>
        {isLoading ? ( 
        <AppText>Loading...</AppText> )
        :
        <View>
          <View style={styles.container}>
          <ListItem
            title="Current Order"
            style={styles.lightSecondaryColorBar}
          /> 
          <ListItem
            title={quantity == 0 ? "" : "Status: Submitted"}
            subTitle={"Items: " + quantity}
            extraLine2={"Total: $" + total}
          />
        </View>
        
        <View style={styles.container}>
        <ListItem
            title="Previous Orders"
            style={styles.tertiaryColorBar}
          /> 
        <FlatList
                data={previousOrders}
                keyExtractor={(order) => order._id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                extraData={previousOrders}
                renderItem={({ item }) => (
                <ListItem
                  title={"Date: " + Moment(item.createdAt).format('DD MMM hh:mm')}
                  subTitle={"Cash Back Saved: $" + ((2 / 100) * (item.quantity * item.item.unitPrice)).toFixed(2)}
                  extraLine1={"Items: " + item.quantity}
                  extraLine2={"Total: $" + (item.quantity * item.item.unitPrice)}
                  onPress={() => reorderConfirmation(item)}
                />
                )}
            />
        </View>
        </View>
      }
      </Screen>
    );
  }
  

const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.light,
    },
    container: {
      marginVertical: 25,
    },
    lightSecondaryColorBar: {
      backgroundColor: colors.lightSecondary,
    },

    tertiaryColorBar: {
      backgroundColor: colors.tertiary,
    },
  });

export default MyOrdersScreen;
