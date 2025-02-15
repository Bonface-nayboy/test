import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { toast } from "react-toastify";


const Gunners = () => {
    const navigation=useNavigation();
    const [isConnected,setIsConnected]=useState(true);

    useEffect(()=>{
        const unsubscribe=NetInfo.addEventListener((state)=>{
            setIsConnected(state.isConnected);
        })
        return()=> unsubscribe();
    },[]);
    
    const handleNavigate= () =>{
        if(isConnected){
            navigation.navigate("Login")
        }
       else{
        Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
       }
    }
    return (
        <View style={styles.container} >
             {!isConnected && (
                <View style={styles.noConnectionBar}>
                    <Text style={styles.noConnectionText}>No Internet Connection</Text>
                </View>
            )}

               <Text style={{
                marginTop:50,
                textAlign:'center',
                fontWeight:'bold',
                fontSize:20,
                color:'black'
               }} >Let's Meet Our Summer Drinks</Text>

            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_oQ2MPCaoLI_Iew5JneJLqh9qmCg8Wo8-4w&s' }}
                width={300}
                height={350}
                style={{
                    marginLeft: 20,
                    marginTop:10
                }}
            />
            <Text style={styles.text} >Gunners Restaurant </Text>
            <View>
                <Button
                    style={styles.Button}
                    onPress={handleNavigate}
                >
                    <Icon
                        name="envelope"
                        style={{
                            borderRadius: 10,
                            color: 'white',
                            marginRight: 20,
                            padding:20

                        }}
                        size={20} />
                    <Text style={styles.Buttontext} > Login with Email</Text>
                </Button>
                <Button
                    style={styles.Button}

                >
                    <Icon
                        name="google"
                        style={{
                            borderRadius: 10,
                            color: 'white',
                            marginRight: 20,
                            padding:20
                        }}
                        size={20} />
                    <Text style={styles.Buttontext} > Login with Google</Text>
                </Button>
                <Button
                    style={styles.Button}

                >
                    <Icon
                        name="facebook"
                        style={{
                            borderRadius: 10,
                            color: 'white',
                            marginRight: 20,
                            padding:20
                        }}
                        size={20} />
                    <Text style={styles.Buttontext} >Login with Facebook</Text>
                </Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%'

    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color:'black'
    },
    Button: {
        marginTop: 10,
        backgroundColor: "green",
        paddingVertical: 5,
        width: 250,
        marginLeft: 40
    },
    Buttontext: {
        color: "white",
        textAlign: "center",
        fontWeight: 'bold',
    }, noConnectionBar: {
        backgroundColor: "red",
        padding: 10,
        textAlign: "center",
    },
    noConnectionText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
})

export default Gunners;