import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, View, ScrollView, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Appbar, Button, Card, TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from '@react-native-picker/picker';

const Homepage = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [username, setUsername] = useState('Bonface');
    const [heartStates, setHeartStates] = useState({});
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState('Small');
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Items'); // Assuming 'Items' is the name of the items page route
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer); // Cleanup if the component is unmounted
    }, [navigation]);

    const itemImages = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNFqncVlZe9584IpzbrUmgOIzJB8qjfQJag&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNRw4LJPgPg8ZCu7wDuj9BG5h0yhy_ZCQhQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR66Ka7buHw-0QVr0rZ09aHXwh1ZOsIW-WmcA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHkCJh1dH3UWfwx5NXXz_JXu_Hdl54IPijQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzapL2Ml1-AnGmxff_X0DZrXo5xY0cHPmTg&s',
    ];

    const featuredItems = [
        { name: 'Vanilla Yogurt', price: 'Ksh 200' },
        { name: 'Gracies Yogurt', price: 'Ksh 300' },
        { name: 'Gamba Yogurt', price: 'Ksh 350' },
        { name: 'Homie Yogurt', price: 'Ksh 250' },
        { name: 'HP Elitebook', price: 'Ksh 50,000' },
    ];

    const handleAddToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.name === item.name
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                const itemIndex = featuredItems.indexOf(item);
                const itemImage = itemImages[itemIndex % itemImages.length];
                return [...prevItems, { ...item, quantity: 1, image: itemImage }];
            }
        });
    };

    const handleHeartPress = (index) => {
        setHeartStates(prevStates => ({
            ...prevStates,
            [index]: !prevStates[index]
        }));
    };

    const handleCartButtonPress = () => {
        navigation.navigate('Cart', { cartItems });
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const openModal = (item) => {
        const itemIndex = featuredItems.indexOf(item);
        const itemImage = itemImages[itemIndex % itemImages.length]; // Safely assign the image
        setSelectedItem({ ...item, image: itemImage }); // Add image URL to selectedItem
        setIsModalVisible(true);
    };


    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
                <Appbar.Header style={{ backgroundColor: 'white', elevation: 3 }}>
                    <Appbar.Content title={`${username} 😊`} titleStyle={{ color: "#333", fontSize: 16, fontWeight: 'bold' }} />
                    <Appbar.Action icon="bell" onPress={() => navigation.navigate('Home')} color="green" />
                    <Appbar.Action icon="menu" onPress={() => navigation.navigate('Mainmenu')} color="black" />
                </Appbar.Header>
                <StatusBar style="auto" />

                <View style={{ alignItems: 'center', marginBottom: 0, marginTop: 20, flexDirection: 'row', marginLeft: 30 }}>
                    <View style={{
                        width: 300,
                        height: 45,
                        borderRadius: 25,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderColor: 'white',
                        borderWidth: 1,
                        paddingHorizontal: 10,
                    }}>
                        <TextInput
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="Search beverages and foods"
                            placeholderTextColor='#aaa'
                            style={{
                                flex: 1,
                                height: 10,
                                paddingHorizontal: 10,
                                fontSize: 16,
                                color: 'black',
                                backgroundColor: 'white',
                            }}
                        />
                        <Icon
                            name="search"
                            color="#6c757d"
                            size={16}
                            style={{ marginRight: 10 }}
                        />
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 50 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                        {featuredItems.map((item, index) => (
                            <View key={index} style={{ marginHorizontal: 5 }}>
                                <Card style={{
                                    width: 180,
                                    height: 200,
                                    backgroundColor: '#006400',
                                    borderRadius: 15,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                    <TouchableOpacity onPress={() => openModal(item)}>
                                        <View style={{ alignItems: 'center', padding: 10 }}>
                                            <Image
                                                source={{ uri: itemImages[index % itemImages.length] }}
                                                style={{ width: 120, height: 110, borderRadius: 10 }}
                                            />
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>{item.name}</Text>
                                            <Text style={{ color: 'white', fontSize: 14 }}>{item.price}</Text>
                                            <Button onPress={() => handleAddToCart(item)}>
                                                <Icon
                                                    name='cart-plus'
                                                    size={24}
                                                    color='white'
                                                />
                                            </Button>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <Text style={{ color: 'black', fontSize: 16, marginLeft: 20, marginBottom: 10, fontWeight: 'bold' }}>Categories</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 30 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20 }}>
                        {['🍞 FOODS', '☕ BEVERAGES', '🍞 FOODS', '☕ BEVERAGES'].map((category, index) => (
                            <View key={index} style={{ marginHorizontal: 5 }}>
                                <Card style={{
                                    width: 180,
                                    height: 80,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    elevation: 3,
                                }}>
                                    <View style={{ alignItems: 'center', padding: 10 }}>
                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{category}</Text>
                                        <Text style={{ color: 'green', fontSize: 14 }}>40 MENUS</Text>
                                    </View>
                                </Card>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={{ paddingHorizontal: 10, marginBottom: 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Featured Beverages</Text>
                        <Text style={{ color: 'green', fontSize: 14 }}>40 MENUS</Text>
                    </View>

                    {featuredItems.map((item, index) => (
                        <View key={index} style={{ marginVertical: 10 }}>
                            <Card style={{
                                width: '100%',
                                height: 150,
                                backgroundColor: 'white',
                                borderRadius: 15,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                            }}>
                                <TouchableOpacity onPress={() => openModal(item)}>
                                    <View style={{ padding: 10, flexDirection: 'row' }}>
                                        <Image
                                            source={{ uri: itemImages[index % itemImages.length] }}
                                            style={{ width: 120, height: 120, borderRadius: 10 }}
                                        />
                                        <View>
                                            <Text style={{ color: 'black', fontSize: 16, marginTop: 5, marginLeft: 10 }}>{item.name}</Text>
                                            <Text style={{ color: 'black', fontSize: 16, marginTop: 50, marginLeft: 10, fontWeight: 'bold' }}>{item.price}</Text>

                                            <Button onPress={() => handleAddToCart(item)}>
                                                <Icon
                                                    name='cart-plus'
                                                    size={24}
                                                    color='red'
                                                />
                                            </Button>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => handleHeartPress(index)}>
                                                <Icon
                                                    name='heart'
                                                    color={heartStates[index] ? 'red' : 'green'}
                                                    size={24}
                                                    style={{ marginLeft: 40 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Modal Component */}
            {selectedItem && (
    <Modal
        visible={isModalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={closeModal}
    >
        <View style={styles.modalContainer}>
            <View style={styles.greenBackground}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                }} >
                    <Icon
                        name='close'
                        color='red'
                        size={20}
                        style={{ marginLeft: 0 }}
                        onPress={closeModal}
                    />
                    <Text style={{
                        textAlign: 'center',
                        flex: 1,
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                    }} >Item Details</Text>
                    <Icon
                        name='cart-plus'
                        color='white'
                        size={24}
                        style={{ marginRight: 0 }}
                        onPress={() => handleAddToCart(selectedItem, selectedSize)}
                    />
                </View>

                <Image
                    source={{ uri: selectedItem.image }}
                    style={styles.modalImage}
                />
            </View>
            <View style={styles.whiteBackground}>
                <Picker
                    selectedValue={selectedSize}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedSize(itemValue)}
                >
                    <Picker.Item label="Small" value="Small" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="Large" value="Large" />
                    <Picker.Item label="Extra Large" value="Extra Large" />
                </Picker>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalPrice}>{selectedItem.price}</Text>
            </View>
        </View>
    </Modal>
)}




            <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon
                            name='home'
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer1}>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon
                            name='heart'
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer1}>
                    <TouchableOpacity onPress={handleCartButtonPress}>
                        <View style={styles.cartIconContainer}>
                            <Icon
                                name='shopping-cart'
                                size={24}
                                color='white'
                            />
                            {getCartItemCount() > 0 && (
                                <Text style={styles.cartBadge}>{getCartItemCount()}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer1}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Icon name="user" size={30} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        paddingHorizontal: 4,
        marginHorizontal: 4,
    },
    picker: {
        height: 50,
        width: '100%',
        color: 'red',
        marginVertical: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 30,
        marginLeft: 10
    },
    iconContainer1: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 30,
        marginLeft: 50
    },
    cartIconContainer: {
        position: 'relative',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadge: {
        position: 'absolute',
        right: 0,
        top: -5,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
    },
    greenBackground: {
        flex: 0.8,
        backgroundColor: '#006400',
        padding: 20,
    },
    whiteBackground: {
        flex: 0.6,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 40
    },
    modalImage: {
        width: 200,
        height: 200,
        marginLeft: 60,
        marginTop: 50,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        color: 'black',
    },
    modalPrice: {
        fontSize: 16,
        color: 'green',
        textAlign:'center',
        marginBottom: 15,
    },
    modalCloseButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    modalCloseButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Homepage;
