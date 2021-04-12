import React, { useState,useEffect } from "react";
import { StyleSheet, View, FlatList,LogBox } from "react-native";
import * as Yup from "yup";
import ButtonTab from "../components/ButtonTab";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemMoveStepAction from "../components/lists/ListItemMoveStepAction";
import itemsApi from "../api/items";
import ordersApi from "../api/orders";
import usersApi from "../api/users";
import Text from "../components/Text";
import { useContext } from "react";
import AuthContext from "../auth/context";
import Moment from 'moment';
LogBox.ignoreAllLogs();

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  image: Yup.array().required().nullable().label("Please select an image"),
});

function OrdersStatusScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);
  Moment.locale('en');

  useEffect(() => {
    async function fetchData() {
      const response = await usersApi.getAllUsers(authContext.token);
      setUsers(response.data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const load = navigation.addListener('focus', () => {
      loadListing(currentStatus);
    });
    return load;
  }, [navigation]);


  const loadListing = async (status) => {
    setLoading(true);
    setCurrentStatus(status);
    var response = {};
    switch (status) {
      case 'submitted':
        response = await ordersApi.getAllSubmittedOrder();
        break;
      case 'inProcess':
        response = await ordersApi.getAllInProcessOrder();
        break;
      case 'ready':
        response = await ordersApi.getAllReadyOrder();
        break;
        case 'onDelivery':
          response = await ordersApi.getAllOnDeliveryOrder();
          break;
        case 'delivered':
          response = await ordersApi.getAllDeliveredOrder();
          break;
      default:
        break;
    }

    let array = response.data.data
    setListings(array);
    
    let previous = []
    let reformattedArray = array.map(obj => {
      let user = users.find(user => user._id === obj.user);
      
      let rObj = {}
      if (previous.name != user.name){
        rObj["name"] = user.name
        rObj["_id"] = obj._id
        rObj["createdAt"] = obj.createdAt
        rObj["orderStatus"] = obj.orderStatus
        rObj["itemId"] = obj.item.id
        rObj["itemTitle"] = obj.item.title
        previous = rObj
        return rObj
      }
      return
    })
    reformattedArray = reformattedArray.filter(function( element ) {
      return element !== undefined;
    });

    setFilteredList(reformattedArray);
    setLoading(false);
  }

  const changeStatus = async (item) => {
    
    let newStatus;
 
    var status = item.orderStatus;
    switch (status) {
      case 'submitted':
        newStatus = "inProcess"
        break;
      case 'inProcess':
        newStatus = "ready"
        break;
      case 'ready':
        newStatus = "onDelivery"
        break;
        case 'onDelivery':
          newStatus = "delivered"
          break;
      default:
        newStatus = ""
    }

    if (newStatus != ""){
      const result = await itemsApi.changeStatusItemOrder(authContext.token,item.itemId,item._id,newStatus );
    } 
    loadListing(status);
  }
  return (
    <Screen style={styles.screen}>
      <View style={ {flexDirection: "row"}}>
        <ButtonTab title="Submitted" onPress={() => loadListing("submitted")}></ButtonTab> 
        <ButtonTab title="In Process" onPress={() => loadListing("inProcess")}></ButtonTab> 
        <ButtonTab title="Ready" onPress={() => loadListing("ready")}></ButtonTab> 
        <ButtonTab title="On Delivery" onPress={() => loadListing("onDelivery")}></ButtonTab> 
        <ButtonTab title="Delivered" onPress={() => loadListing("delivered")}></ButtonTab> 
      </View>
      <View style={styles.container}>
        {currentStatus != "" && (
              <Text style={styles.title}>
                All orders with {currentStatus} status
              </Text>
        )}
        <FlatList
          data={filteredlist}
          keyExtractor={(listing) => listing._id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          extraData={filteredlist}
          renderItem={({ item }) => (
           
            <View>
              <ListItem
                title= {item.name} 
                extraLine2={"Date: " + Moment(item.createdAt).format('DD MMM hh:mm')}
                renderLeftActions={() => (
                  <ListItemMoveStepAction onPress={() => changeStatus(item)} />
                )}
              />
            </View>
          )}
        />  
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
  rowContainer: {
    flexDirection: "row",
    width: "90%",
  },
  title: {
    fontSize: 17
  },
});

export default OrdersStatusScreen;
