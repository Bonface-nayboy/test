import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
// import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const navigation = useNavigation();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password) => {
        const minLength = 7; 
        const hasUpperCase = /[A-Z]/.test(password); 
        const hasNumber = /\d/.test(password); 
        const hasSpecialChar = /[!@#$%^&*(),_+.?":{}|<>]/.test(password); 
        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    const handleRegister = async () => {
       
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 7 characters long, include an uppercase letter, a number, and a special character.');
            return;
        } else {
            setPasswordError('');
        }

        try {
            const response = await fetch('https://backend-rees-realme.onrender.com/api/v1/Register', {
                // const response = await fetch('https://gunners-7544551f4514.herokuapp.com/api/v1/Register' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{ username, email, password }]),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            await AsyncStorage.setItem('userCredentials', JSON.stringify({ username, email, password }));

            setEmail('');
            setUsername('');
            setPassword('');

            Toast.show({
                type: 'success',
                text1: 'Account created successfully',
                text2: `Welcome, ${username}! 👩‍💼`
            });

            navigation.navigate('subbranch');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to create an account!',
                text2: 'Poor connection, please try again.'
            });

        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Welcome To Our Registration Page</Text>
            <Card style={styles.card}>
                <Text style={styles.text}>Register</Text>
                <View style={{ marginVertical: 1 }}>
                    <Text style={{ color: 'black', marginBottom: 5 }}>Username</Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                        style={styles.input}
                    />
                    <Text style={{ color: 'black', marginBottom: 5 }}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(text) => {
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov)$/;
                            if (emailRegex.test(text)) {
                                setEmail(text);
                            } else {
                                setEmail('');
                                Alert.alert('Invalid Email', 'Please enter a valid email ending with .com, .net, .org, etc.');
                            }
                        }}
                        placeholder="Enter email"
                        style={styles.input}
                    />

                </View>

                <View style={{ marginVertical: 5 }}>
                    <Text style={{ color: 'black', marginBottom: 5 }}>Password</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        height: 50,
                        paddingHorizontal: 0,
                    }}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter password"
                            style={{
                                flex: 0.9,
                                height: 10,
                                color: 'black',
                                backgroundColor: 'white'
                            }}
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="black"
                            onPress={toggleShowPassword}
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                    {passwordError ? (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}
                </View>

                <Button style={{
                    backgroundColor: '#006400',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 25,
                    marginTop: 10,
                }}
                    onPress={handleRegister}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Register</Text>
                </Button>

                <Text style={styles.text2}>By tapping Register, you accept our Terms and Conditions</Text>

                <View style={styles.container2}>
                    <Text style={styles.text2}>If you have an account 👉</Text>
                    <Button style={styles.button1} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.button1}>Login</Text>
                    </Button>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',

    },
    text: {
        textAlign: 'center',
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold'
    },
    text1: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold'
    },
    text2: {
        textAlign: 'center',
        color: 'black',
        fontSize: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    card: {
        backgroundColor: 'white',
        height: 'auto',
        width: 320,
        padding: 15,
        marginTop: 50
    },
    inputContainer: {
        marginTop: 2
    },
    button: {
        width: 250,
        backgroundColor: 'green',
        marginLeft: 0,
        height: 50,
        marginTop: 10
    },
    container2: {
        flexDirection: "row",
        justifyContent: "center",
        width: 200
    },
    button1: {
        color: 'green',
        fontSize: 20,
    },
    input: {
        width: 'auto',
        fontSize: 16,
        color: 'black',
        backgroundColor: "white",
        marginLeft: 0

    },

});

export default Register;
