import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";


const Gunners = () => {
    const navigation=useNavigation();

    return (
        <View style={styles.container} >
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
                    onPress={()=>navigation.navigate('Login')}
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
    },
})

export default Gunners;