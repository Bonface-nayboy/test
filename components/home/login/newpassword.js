import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

const Newpass = () => {
    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('Bonnie1234');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handlesubmitNewPassword = () => {
        if (confirmPassword === password) {
            Toast.show({
                type: 'success',
                text1: 'Password reset submitted successfully',
                text2: 'please wait,Your request is being proceessed...'
            })
            navigation.navigate('Login')
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Invalid credentials',
                text2: 'Your Password do not match'
            })
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.text} >Enter New Password</Text>
            <Text style={styles.text1}>Your new password must be different from the Previous one</Text>
            <Card style={styles.card}>
                {/* <View>
                    <Text style={styles.text2} >Password</Text>
                    <View style={styles.containerm}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            type='password'
                            placeholder="enter password"
                            value={password}
                            onChangeText={setPassword}
                            style={{
                                backgroundColor: 'white',
                                marginLeft: 10,
                                marginTop: 0
                            }}
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={'#aaa'}
                            onPress={toggleShowPassword}
                        />
                    </View>
                    <Text style={styles.text2} >Confirm Password</Text>
                    <View style={styles.containerm}>
                        <TextInput
                            secureTextEntry={!showConfirmPassword}
                            type='password'
                            placeholder="Enter password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={{
                                backgroundColor: 'white',
                                marginLeft: 0,
                                marginTop: 0,

                            }}
                        />
                        <MaterialCommunityIcons
                            name={showConfirmPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={'#aaa'}
                            onPress={toggleShowConfirmPassword}
                        />
                    </View>

                </View> */}

                <View style={{ marginVertical: 10 }}>
                    {/* Password Field */}
                    <Text style={{ color: '#aaa', marginBottom: 5 }}>Password</Text>
                    <View style={{
                        flexDirection: 'row',  // Horizontal alignment
                        alignItems: 'center',  // Vertical center
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        width: 250,
                        height: 50,
                        paddingHorizontal: 10,
                        marginBottom: 10  // Space between password and confirm password
                    }}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={setPassword}
                            style={{
                                flex: 0.8,  // TextInput takes up remaining space
                                height: 10,
                                color: '#000',
                                backgroundColor: 'white',
                            }}
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#aaa"
                            onPress={toggleShowPassword}
                            style={{ marginLeft: 10 }}
                        />
                    </View>

                    {/* Confirm Password Field */}
                    <Text style={{ color: '#aaa', marginBottom: 5 }}>Confirm Password</Text>
                    <View style={{
                        flexDirection: 'row',  // Horizontal alignment
                        alignItems: 'center',  // Vertical center
                        backgroundColor: 'white',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        height: 50,
                        paddingHorizontal: 10,
                        width: 250,

                    }}>
                        <TextInput
                            secureTextEntry={!showConfirmPassword}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={{
                                flex: 1,  // TextInput takes up remaining space
                                height: 10,
                                color: '#000',
                                backgroundColor: 'white'

                            }}
                        />
                        <MaterialCommunityIcons
                            name={showConfirmPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#aaa"
                            onPress={toggleShowConfirmPassword}
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                </View>

            </Card>
            <Button style={styles.button}
                onPress={handlesubmitNewPassword}
            >
                <Text style={styles.text6} >Continue</Text>
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
    button: {
        backgroundColor: 'green',
        width: 350,
        height: 60,
        marginLeft: 6
    },
    text6: {
        fontSize: 18,
        color: 'white',
        padding: 10
    },
    card: {
        padding: 20,
        borderRadius: 0,
        backgroundColor: "white",
        height: 'auto',
        width: 330,
        marginLeft: 15,
        marginBottom: 'auto',

    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
    },
    containerm: {
        flexDirection: "row",
        // alignItems: "center",
        backgroundColor: "white",
        // marginVertical: 10,
        // borderColor: "red",
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        paddingHorizontal: 1,
    },
    text1: {
        fontSize: 18,
        marginTop: 1,
        marginBottom: 30
    },
    text2: {
        fontSize: 16,
        // marginLeft: 10,
        color: '#aaa',
        padding: 20
    },
})

export default Newpass;