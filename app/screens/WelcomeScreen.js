import React from 'react';
import { Text, ImageBackground, StyleSheet, View } from 'react-native';
import Button from "../components/Button";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground 
            blurRadius={2}
            style={styles.background}
            source={require("../assets/background.jpg")}>
        <View style={styles.container}>
            <Text style={styles.tagline}>We have something</Text>
            <Text style={styles.tagline}>for everyone!</Text>
        </View>
        <View style={styles.buttonsContainer}>
        <Button
          title="Login" onPress={() => navigation.navigate("Login")}
          color="primary"
        />
        <Button
          title="Register" onPress={() => navigation.navigate("Register")}
          color="secondary"
        />
      </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container:{
        position: "absolute",
        top: 70,
        alignItems: "center"
    },
    buttonsContainer: {
        padding: 20,
        width: "100%",
      },
    tagline: {
        fontSize: 25,
        color: colors.white,
        fontWeight: "800",
        textShadowColor: colors.black,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 20
        
      },

})

export default WelcomeScreen;   