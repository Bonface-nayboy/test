import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "./theme";
import { useNavigation } from "@react-navigation/native";

const Mainmenu = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [activeButton, setActiveButton] = useState(null);
    const [basketItems, setBasketItems] = useState([]);
    const navigation = useNavigation();

    const handlePress1 = (mode) => {
        if (mode === 'light') {
            setIsDarkMode(false);
        } else if (mode === 'dark') {
            setIsDarkMode(true);
        }
    };

    const addItemToBasket = (item) => {
        setBasketItems(prevItems => [...prevItems, item]);
    };

    const handlePress = (buttonId) => {
        setActiveButton(buttonId);
    };

    // Dynamic styles
    const backgroundColor = isDarkMode ? '#333' : '#f8f9fa';
    const textColor = isDarkMode ? 'white' : 'black';
    const buttonBackgroundColor = isDarkMode ? '#444' : 'transparent';
    const iconColor = isDarkMode ? 'white' : '#aaa';
    const modeSwitcherBackgroundColor = isDarkMode ? 'black' : 'white';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'home' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => {
                            handlePress('home');
                            navigation.navigate('Items');
                        }}
                    >
                        <Icon
                            name='home'
                            size={30}
                            color={activeButton === 'home' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'home' ? 'green' : textColor }]}>
                            Home
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'products' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => {
                            handlePress('products');
                            navigation.navigate('MainSales', { basketItems }); // Pass basketItems to Sales
                        }}
                    >
                        <Icon
                            name='shopping-basket'
                            size={30}
                            color={activeButton === 'products' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'products' ? 'green' : textColor }]}>
                            Sales
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'notifacitions' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => handlePress('notifacitions')}
                    >
                        <Icon
                            name='bell'
                            size={30}
                            color={activeButton === 'notifacitions' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'notifacitions' ? 'green' : textColor }]}>
                            Notifications
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'components' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => {
                            handlePress('components');
                            navigation.navigate('Purchases')
                        }}
                    >
                        <Icon
                            name='list'
                            size={30}
                            color={activeButton === 'components' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'components' ? 'green' : textColor }]}>
                            Purchases
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'features' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => handlePress('features')}
                    >
                        <Icon
                            name='star'
                            size={30}
                            color={activeButton === 'features' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'features' ? 'green' : textColor }]}>
                            Most Ordered
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'wishlist' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => handlePress('wishlist')}
                    >
                        <Icon
                            name='heart'
                            size={30}
                            color={activeButton === 'wishlist' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'wishlist' ? 'green' : textColor }]}>
                            Wishlist
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'myorders' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => {
                            handlePress('myorders')
                            navigation.navigate('Products')
                        }}
                    >
                        <Icon
                            name='id-badge'
                            size={30}
                            color={activeButton === 'myorders' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'myorders' ? 'green' : textColor }]}>
                            Products
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'cart' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => {
                            handlePress('cart');
                            navigation.navigate('Cart'); // Pass cartItems to Cart
                        }}
                    >
                        <Icon
                            name='cart-plus'
                            size={30}
                            color={activeButton === 'cart' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'cart' ? 'green' : textColor }]}>
                            My Cart
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'Chatlist' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => handlePress('Chatlist')}
                    >
                        <Icon
                            name='commenting-o'
                            size={30}
                            color={activeButton === 'Chatlist' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'Chatlist' ? 'green' : textColor }]}>
                            Chat List
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'profile' ? 'green' : buttonBackgroundColor }]}
                        onPress={() => {
                            handlePress('profile');
                            navigation.navigate('Profile');
                        }}
                    >
                        <Icon
                            name='user-o'
                            size={30}
                            color={activeButton === 'profile' ? 'green' : iconColor}
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'profile' ? 'green' : textColor }]}>
                            Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { color: activeButton === 'logout' ? 'red' : buttonBackgroundColor }]}
                        onPress={() => {
                            handlePress('logout');
                            navigation.navigate('Login');
                        }}
                    >
                        <Icon
                            name='power-off'
                            size={30}
                            color='red'
                        />
                        <Text style={[styles.buttonText, { color: activeButton === 'logout' ? 'red' : textColor }]}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                    <View style={[styles.modeSwitcher, { backgroundColor: modeSwitcherBackgroundColor }]}>
                        <TouchableOpacity
                            style={styles.circleCard}
                            onPress={() => toggleTheme('light')} // Use toggleTheme to switch to light mode
                        >
                            <Icon
                                name='sun-o'
                                size={30}
                                color={isDarkMode ? 'gray' : 'yellow'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.circleCard}
                            onPress={() => toggleTheme('dark')} // Use toggleTheme to switch to dark mode
                        >
                            <Icon
                                name='moon-o'
                                size={30}
                                color={isDarkMode ? 'white' : 'gray'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,

    },
    buttonText: {
        fontSize: 16,
        marginLeft: 30,
        fontWeight: 'bold',
    },
    modeSwitcher: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
        width: 150,
    },
    circleCard: {
        backgroundColor: 'green',
        borderRadius: 50,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
});

export default Mainmenu;
