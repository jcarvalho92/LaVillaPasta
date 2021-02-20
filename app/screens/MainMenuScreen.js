import React from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";

import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";

function MainMenu() {
  return (
    <Screen>
      <View  style={{marginTop: 20 ,flexDirection:"row" }}>
      <View style={styles.card}>
        <Image style={styles.image} source={require("../assets/pasta/spagetti.jpg")} />
        <Text style={styles.title} numberOfLines={1}>
            Pasta
          </Text>
       
      </View>
      <View style={styles.card}>
        <Image style={styles.image} source={require("../assets/combo.jpeg")} />
        <Text style={styles.title} numberOfLines={1}>
            Combo
          </Text>
       
      </View>
      </View>
      <View  style={{flexDirection:"row" }}>
      <View style={styles.card}>
        <Image style={styles.image} source={require("../assets/salad.jpg")} />
        <Text style={styles.title} numberOfLines={1}>
            Salad
          </Text>
       
      </View>
      <View style={styles.card}>
        <Image style={styles.image} source={require("../assets/dessert.jpeg")} />
        <Text style={styles.title} numberOfLines={1}>
            Dessert
          </Text>
       
      </View>
      </View>

      <View  style={{alignItems: "center"}}>

      <View style={styles.card}>
        <Image style={styles.image} source={require("../assets/drinks.jpeg")} />
        <Text style={styles.title} numberOfLines={1}>
            Drink
          </Text>
       
      </View>
      </View>
    </Screen>

  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: 160,
    height: 160,
  },
  title: {
    marginBottom: 7,
    textAlign: "center"
  },
});

export default MainMenu;
