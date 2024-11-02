import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Footer = () => {
    return (
        <View style={styles.container} > 
            <Text style={styles.text}>Best fashion and design</Text>
            <Text style={styles.text}>Gunners Company</Text>
            <Text style={styles.text}>Visit us on www.gunnerscompany.com</Text>

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor: 'black',
      

    },
    text:{
      fontSize:20,
      textAlign:'center',
        color:'white'
    }
})


export default Footer;