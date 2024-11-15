import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Avatar, Button, Card, Text, TextInput } from "react-native-paper";
// import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };



    const handleLogin = async () => {
        try {
            const response = await fetch('https://gunners-7544551f4514.herokuapp.com/api/v1/Login/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            console.log('Login response:', result);

            // Check if the login was successful
            if (result.success) {
                const { id, email, username } = result.user; // Destructure to get user details
                await AsyncStorage.setItem('userCredentials', JSON.stringify(result.user));
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('userEmail', email); // When logging in, store the correct email

                // Log the stored email
                const storedEmail = await AsyncStorage.getItem('userEmail');
                console.log('Stored email after login:', storedEmail);

                // Clear input fields
                setUsername('');
                setPassword('');

                Toast.show({
                    type: 'success',
                    text1: 'Login Successfully',
                    text2: `Welcome back, ${username}! 👋`,
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                });
               
                navigation.navigate('Items');
            } else {
                Alert.alert('Login Failed', 'Username or password is incorrect!');
            }
        } catch (error) {
            console.error('Error Logging in:', error);
            Toast.show({
                text1: 'Login Failed!',
                text2: 'Check if your credentials are correct.',
                type: 'error',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
              });
        }
    };



    return (
        <View style={styles.container}>

            <Text style={styles.text2} >Please Login inorder to access more features</Text>

            <Card style={styles.card}>
                <Text style={styles.text1}>Login</Text>

                <View>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUCAf/EAD0QAAICAQIDBAYHBQkBAAAAAAABAgMEBREGEiETMUFRImFxkaGxBzJCUoHB0RQjM0NyJDViY3SSorLhFf/EABsBAQACAgMAAAAAAAAAAAAAAAAFBgMEAQIH/8QALhEAAgIBAgUDAgYDAQAAAAAAAAECAwQFERIhMUFRE2GRsfAicYHB0eEUMvEG/9oADAMBAAIRAxEAPwCjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWcMcI2ahGOXn81WN3xj9qz9F6zNRRO6XDEw35FePDjseyI5g4GVn2qrEonbN+EUSnA4CybIqWdkwp/wAEFzP9Cd4mJj4dKpxaYVVrwivn5mYnKtNph/tzZWMnXbpvalcK+X/BF6eBdKh/EsyLH/UkvkZpcFaM1t2dy9as/wDCRA21j1JbcK+CPepZbe/qMh+TwDhST/Zcu6t/5iUvlsR3VOD9UwIucILJqXXmp6tfh3lpAwWYFE102/I2adayq3+J8S9yjWnF7NNP1nwtnXeG8HV4SlKCpydul0F4+teJWmr6VlaRlOjKht92a+rNeaIbKwp0c1zRZMLUastbR5S8GiADSJAAAAAAAAAAAAAAAAAG7o2BPU9SoxIfzJek/JeL9x3hBzkorudZSUIuUuiJDwVw4s6a1DNhvjQfoQa/iP8AQsUx49FeNRXRRFRrrioxivBIyFpx6I0wUUUPOzJ5dvE+nZAjmu8X4Wl3Tx6oPKyIdJRjLaMX5N+fsMfF3EtWm1zwseU3lzg/Sg9uz37uvmVo25NuTbb6ts0s3O9L8Fb5/Qk9M0lXR9W9cuy8kus4/wBQdjdWJixh4RlzNr8d18jRyuMtZv3UL40x5+ZdnBJr1b+RHgRMsy+XWTJ+Gn4sOlaJjp3HuXW4x1HHrvgls51+jP2+XyJnpWr4OrVdphXKTS3lB9JR9qKbJJwDaq+Ia4bPeyEo7rw6N9fcbmHnWuxQm90yO1HSsf0ZWwXC0t+XT4LPNHWNMx9WwpY2Suj6wmu+D80bwJyUVJbMqkJyrkpRezRS+qaffpmbbiZK2nB967pLwaNQsrj3SVmab+21R/f4y3e32oePu7/eVqVnMx/Qs2XTsXvAy1lUqffv+YABqG6AAAAAAAAAAAACdfRthdMrOkl4VQe34v8AL3kFLV4IqVXDWK0tnY5Tf+5r8kSOmQUrt32RE61a68Rpd3t9/B3ggCwlLKX1XItytRybsjftJWS3W++3XuNQ6HENDx9dz6mttr5texvdfBnPKjbvxvfruejVNOEXHpsAAYzICS/R/fCniGMZ7b21ShFvwfR/kRo6HD8efXcBc6h/aIdX7UZseXDbF+5gyoKdE4vumXGAC2Hnh5nCNkJQmk4yTUk/FMpjU8V4Oo5OK/5Vkop+aT6Mukq/j6jsuIrJpfxa4T+G35EZqkN6lLwT2gWtXSr8rf4/6RwAEAWwAAAAAAAAAAAAFt8ISU+G8Bru5GvdJoqQs76P8hXcPxr+1RbKL/Hqvn8CU0qW1rXsQuvR3xU/DX7klABPFPIN9IWjb8urY8G+6GQl8Jfl7iCl421wtrnVbFSrnFxlF9zT70U1rGH/APP1TKxN91VY1F+a8PhsQOp4/BL1F0f1LbomY7a/Rl1j9P6NMAEWToPsZOMlKLaknumvA+HquDssjCO3NJpLdpL3sAtnhXVpaxpEL7E1dXLs7X4Skkuq9qaOwYcTHqxMeFNFMKoRX1IRSW/j3GYt9alGCUnuzzq+UJWylBbLfoCt/pI/vyj/AE0f+0iyCruPchXcR2wXdTCNfw3fzNLU3tR+pKaFFvK38JkdABXS4gAAAAAAAAAAAAmP0cZyqzsjCm9u3hzQ/qj4e7f3EOM2Hk24eVVk0S5bKpqUX60Z8a30bVM18uj/ACKJV+S7QaekajVqun1ZdHRTXpR+7LxRuFqi1Jbo8/nCUJOMlzQKj4sya8riHNtpTUefk6+LilFv4Fn6vqVGlYVmTkSS2T5It/Xlt0SKbsnKyyU5veUm235sidVsXDGH6li/8/S952tey/c8gAhCzA63C2Ndka7h9lj9vGFsZWJx3jGO/Vv2E04P0XT56DjX5ODTZdbzSlK2Ck9uZpd/qSJPXCFceSuEYRXhFbIl8fTW+GyUvDK9ma1GLnVGO75rfc9AAmyrGPIurxsey+57V1Rc5P1LqUvm5M8zMvybPrW2Ob9W73Jz9IOtRroWlUS3ss2lfs/qx70va+/2e0r8gtTvUpqtdi26Hiuup2y6y+n9gAEUToAAAAAAAAAAAAAAB3+E+IJaLlOF3NLDtf7yK74v7yJ9qmvYeDpqzYzVqsjvVGP2v0KoxbK6rO0tgrOVbxg+5v1+o9ZebkZk+bIscvJeC/AksbNdNLTe77exF5Wl1ZNysfLz7mfWNWytXynflz3+5BfVgvJGgAR85ym+KT3ZJQhGEVGK2SAAOp2JFwlxBbpOQqb574NkvSUt/Qfmiz6rIW1QsrkpQnFSjJeKfcU9oVNNuo1vLjKWLB813K/s77fn7ty4N66qt94QqhHv6KMV+hYNMlJ1bPoiqa9VWrIyivxPr9+T2cXibXqtExN1yzy7F+6rb/5P1fM5PEPGlOMnRpEoXXdzua3hH2eb+HtIBfdbkXTuvslZZN7ylJ7tnGXqEYLgr5s407R52NWXraPju/4F91mRdO66bnZOTlKT722YwCBbbe7LWlstkAAcHIAAAAAAAAAAAAAAAAAAAAAAABtaZmSwcyF6XMl0lHzXibeuZl9864/tNtmLyrsoSm3GKXht6uhyjYpl2tfYTl3da233PyNiFrdbq+Pv3McoR4lPY1wfWtm0/DyZ8NcyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z"
                        }}
                        alt="profile_pic"
                        width={100}
                        height={100}
                    />
                </View>

                <View style={{ marginVertical: 1 }}>
                    <Text style={{ color: 'black', marginBottom: 5 }}>Username</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        height: 50,
                        paddingHorizontal: 0,
                        marginBottom: 10,
                    }}>
                        <TextInput
                            type="text"
                            name="username"
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Enter username"
                            style={{
                                flex: 0.9,
                                height: 10,
                                color: 'black',
                                backgroundColor: 'white',
                                padding: 10, // Add padding for text visibility
                                fontSize: 16,
                            }}
                        />
                    </View>


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
                                backgroundColor: 'white',
                                padding: 10, // Add padding for text visibility
                                fontSize: 16,
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
                    {/* </View> */}


                </View>



                <Button style={styles.Button}
                    onPress={handleLogin}
                >
                    <Text style={styles.Buttontext}>Login</Text>
                </Button>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 1,
                    paddingHorizontal: 10,
                }} >
                    <Text style={styles.text4}>Forgot password?👉</Text>
                    <Button
                        onPress={() => navigation.navigate('ResetPassword')}
                    >
                        <Text style={{ color: 'green', fontWeight: 'bold' }} > Reset password</Text>
                    </Button>
                </View>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 2,
                    paddingHorizontal: 10,
                }}>
                    <Text style={styles.text4}>Create an account 👉</Text>
                    <Button
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.text3}>Register</Text>
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
    },
    card: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: "white",
        height: 'auto',
        marginTop: 40
    },
    text1: {
        fontSize: 30,
        color: "black",
        textAlign: "center",
        marginBottom: 0,
    },
    containerm: {
        flexDirection: "row",
        // alignItems: "center",
        backgroundColor: "white",
        // marginVertical: 10,
        // borderColor: "red",
        borderWidth: 1,
        borderRadius: 5,
        width: 250,
        paddingHorizontal: 1,
    },
    input: {
        height: 50,
        fontSize: 16,
        color: "black",
        backgroundColor: "white",
        marginLeft: 0

    },
    icon: {
        paddingLeft: 0,
        marginLeft: 0,

    },
    Button: {
        marginTop: 10,
        backgroundColor: "green",
        paddingVertical: 5,
        width: 150,
        marginLeft: 40
    },
    Buttontext: {
        color: "white",
        textAlign: "center",
        fontWeight: 'bold'
    },
    Button1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "whitesmoke",
        paddingVertical: 0,
        width: 200,
        height: 50,
        borderRadius: 5,
        padding: 20
    },

    text2: {
        marginLeft: 20,
        color: "black",
    },
    container2: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",


    },
    text3: {
        color: "green",
        fontSize: 20,
    },
    text4: {
        color: "black",
        fontSize: 13,
        marginRight: 0,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginBottom: 0,
    },
});

export default Login;
