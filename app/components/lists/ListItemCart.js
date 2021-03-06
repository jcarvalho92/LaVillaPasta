import React from "react";
import { useState } from "react";
import { View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Text from "../Text";
import colors from "../../config/colors";
import itemsApi from "../../api/items";
import { useContext } from "react";
import AuthContext from "../../auth/context";

function ListItemCart({
  order, 
  title,
  subTitle,
  unitPrice,
  imageUrl,
  IconComponent,
  onPress,
  renderRightActions,
  style
}) {
  const authContext = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(unitPrice*quantity);
  const increaseQuantity = async () => {
    let quant = quantity;
    quant++;
    setQuantity(quant);
    setPrice(unitPrice * quant) ;
    
    if (order){
      const result = await itemsApi.changeQtdItemOrder(authContext.token,order.item.id,order.id,quant );
    }
  }
  const decreaseQuantity = async () => {
    if(quantity > 1){
      let quant = quantity;
      quant--;
      
      setQuantity(quant);
      setPrice(unitPrice * quant) ;

      if (order){
        const result = await itemsApi.changeQtdItemOrder(authContext.token,order.item.id,order.id,quant );
      }
    }
  }
  
  return (
    <View>
      {order && (order.item.type != "sauce")  && (order.item.type != "topping") ? 
      (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.medium} onPress={onPress}>
          <View style={[styles.container, style]}>
            {IconComponent}
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
               {title}
              </Text>
              {subTitle && (
                <Text style={styles.subTitle} numberOfLines={2}>
                  {subTitle}
                </Text>
              )}
              <View>
                <View style={{flexDirection: "row", paddingVertical: 5}}>
                  <Text style={styles.quantity}>
                    Quantity: 
                  </Text>
                  <Text style={styles.quantity}>
                    {quantity}
                  </Text>
                  <View style ={{position: "absolute", right: 0}}>
                    <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => decreaseQuantity()}
                    >
                    <MaterialCommunityIcons
                      name="minus-circle"
                      size={30}
                      color={colors.primary}
                    />
                 </TouchableOpacity>
                 <TouchableOpacity
                   style={styles.iconContainer}
                    onPress={() => increaseQuantity()}
                 >
                  <MaterialCommunityIcons
                    name="plus-circle"
                    size={30}
                    color={colors.lightSecondary}
                  />
                 </TouchableOpacity>
                </View>
              </View>  
            </View>
            <Text style={styles.priceInfo} numberOfLines={1}>
              {"$" + price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
    </Swipeable>
      )
      :
      (
        <View>
          <View style={[styles.container, style]}>
            <View style={styles.detailsContainer}>
              <Text style={styles.subTitle} numberOfLines={1}>
               {title}
              </Text>
            </View>
          </View>    
        </View>
      )
    }
      
  </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "400",
  },
  quantity: {
    fontSize: 14,
    fontWeight: "bold",
  },
  priceInfo: {
    color: colors.mediumsSecondary,
    fontWeight: "bold",
  },
});

export default ListItemCart;
