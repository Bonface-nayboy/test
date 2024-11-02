import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

const Newcode = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('F90Ye5')

    const handleCodesubmit = () => {
        if (code === 'F90Ye5') {
            Toast.show({
                type: 'success',
                text1: 'Code submited successfully',
                text2: 'Your request is being proceessed...'
            })
            navigation.navigate('newpassword')
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Invalid Code',
                text2: 'The code has expired'
            })
        }

    }

    return (
        <View style={styles.container} >
            <Text style={styles.text} >Enter Code</Text>
            <Text style={styles.text1} >An authentication Code has been sent to </Text>
            <Text style={styles.text2} >bonnay@gmail.com</Text>
            <Text style={{
                marginTop: 10,
                marginLeft: 10,

            }} >Enter Code</Text>
            <TextInput
                type='string'
                placeholder="F90Ye5"
                value={code}
                onChangeText={setCode}
                style={{
                    backgroundColor: 'white',
                    width: 300,
                    marginLeft: 10,
                }}
            />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
                marginBottom: 'auto',
                paddingHorizontal: 10,
                marginLeft: 50
            }}>
                <Text>If you don't receive the code!</Text>
                <Button
                    onPress={() => navigation.navigate('Code')}

                >
                    <Text style={{ color: 'green', textDecorationLine: 'underline', fontWeight: 'bold' }} >Resend</Text>
                </Button>
            </View>


            <Button style={styles.button}
                onPress={handleCodesubmit}
            >
                <Text style={styles.text6} >Send Code</Text>
            </Button>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 1,
                paddingHorizontal: 10,
                marginLeft: 50
            }} >
                <Text style={{ textAlign: 'center' }} >Back to</Text>
                <Button
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ color: 'green', textDecorationLine: 'underline', fontWeight: 'bold' }} >Login</Text>
                </Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'white',
        height: '100%'

    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
    },
    text1: {
        fontSize: 18,
        marginTop: 0,
        marginBottom: 3
    },
    text2: {
        fontSize: 16,
        marginLeft: 10
    },
    button: {
        backgroundColor: 'green',
        // marginTop: 350,
        width: 350,
        height: 60,
        marginLeft: 6
    },
    text6: {
        fontSize: 18,
        color: 'white',
        padding: 10
    },
})

export default Newcode;