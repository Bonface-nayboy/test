import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
// import Toast from "react-native-toast-message";

const ResetPassword = () => {
    const [email, setEmail] = useState('bonnay@gmail.com');
    const navigation = useNavigation();

    const handleReset = () => {
        if (email === 'bonnay@gmail.com') {
            // Toast.show({
            //     type: 'success',
            //     text1: 'Password reset has been sent successfully',
            //     text2: 'Your request is being processed...'
            // })
            Alert('Password reset has been sent successfully')
            navigation.navigate('Code')

        }
        else {
            // Toast.show({
            //     type: 'error',
            //     text1: 'Invalid Email',
            //     text2: 'Failed to send the request'
            // })
            Alert('Invalid Email')
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.text} >Forgot Password</Text>
            <Text style={styles.text1} >Enter the email associated to your account and we'll send an email to reset your password</Text>

            <Text style={styles.text3} >Enter Email</Text>
            <TextInput
                type='email'
                placeholder="example@gmail.com"
                value={email}
                onChangeText={setEmail}
                style={{
                    backgroundColor: 'white',
                    width: 300,
                    marginLeft: 10,
                    marginTop: 0,
                    marginBottom: 'auto'
                }}

            />

            <Button style={styles.button}
                onPress={handleReset}
            >
                <Text style={styles.text2} >Send📧</Text>
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
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold'
    },
    text1: {
        marginLeft: 3,
        fontSize: 18,
        marginTop: 5,
    },
    text2: {
        fontSize: 18,
        color: 'white',
        padding: 10
    },
    text3: {
        fontSize: 15,
        marginTop: 20,
        marginLeft: 10
    },
    button: {
        backgroundColor: 'green',
        width: 350,
        height: 60,
        marginLeft: 6
    }
})


export default ResetPassword;