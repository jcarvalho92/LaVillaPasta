import React, { useState,useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as Yup from "yup";
import ButtonTab from "../components/ButtonTab";
import Button from "../components/Button";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import itemsApi from "../api/items";
import ordersApi from "../api/orders";
import usersApi from "../api/users";
import {CheckBox} from 'react-native-elements';
import Text from "../components/Text";
import { useContext } from "react";
import AuthContext from "../auth/context";
import Moment from 'moment';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  image: Yup.array().required().nullable().label("Please select an image"),
});

function OrdersStatusScreen() {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
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



  const test = () => {
    console.log("test");
  }

 const loadSubmittedOrder = async () => {
    setLoading(true);
    const response = await ordersApi.getAllSubmittedOrder();
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
  
  
  const loadInProcessOrder = async () => {
    setLoading(true);
    const response = await ordersApi.getAllInProcessOrder();
    let array = response.data.data
    setListings(array);
    setLoading(false);
  }
  

  const loadDeliveredOrder = async () => {
    setLoading(true);
    const response = await ordersApi.getAllDeliveredOrder();
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
    console.log(item);
    
    let newStatus = "";
    
    if (item.orderStatus == "submitted"){
      newStatus = "in process"
    }
    const result = await itemsApi.changeStatusItemOrder(authContext.token,item.itemId,item._id,newStatus );
  }
  return (
    <Screen style={styles.screen}>
      <View style={ {flexDirection: "row"}}>
        <ButtonTab title="Submitted" onPress={() => loadSubmittedOrder()}></ButtonTab> 
        <ButtonTab title="In Process" onPress={() => loadInProcessOrder()}></ButtonTab> 
        <ButtonTab title="Ready" onPress={() => test()}></ButtonTab> 
        <ButtonTab title="On Delivery" onPress={() => test()}></ButtonTab> 
        <ButtonTab title="Delivered" onPress={() => loadDeliveredOrder()}></ButtonTab> 
      </View>
      <View style={styles.container}>

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
              />
              <View style={styles.rowContainer}>
                <CheckBox
                  onPress={() => changeStatus(item)}
                />
                <Text style={styles.label}>Move to next step</Text>
              </View>
              
            </View>
            
          )}
        />  
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Update" 
          color="primary"
          onPress={() => test()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
  buttonsContainer: {
    padding: 10,
    marginLeft: 25,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    width: "90%",
  },
  label: {
    marginTop: 15,
    marginLeft: -10,
    fontSize: 17
  },
});

export default OrdersStatusScreen;
