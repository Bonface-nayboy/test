import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Button, Text, ActivityIndicator, Card, Appbar, TextInput, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [username, setUsername] = useState('');
    const [heartStates, setHeartStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [saleCount, setSaleCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [featuredItems, setFeaturedItems] = useState([]);
    const [basketItems, setBasketItems] = useState([]);
    const [showItems, setShowItems] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();


    const fetchCategories = async () => {
        setLoading(true);
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
          const response = await fetch(`http://192.168.100.45:8080/api/v1/model?email=${userEmail}`);

            if (!response.ok) {
                throw new Error(`Could not fetch categories. Status: ${response.status}`);
            }
            const result = await response.json();
            setCategories(result);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        } finally {
            setLoading(false);
        }
    };



    const fetchItems = async () => {
        setLoading(true);
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            console.log('User Email fetched from storage:', userEmail);

            const response = await fetch(`http://192.168.100.45:8080/api/v1/model?email=${userEmail}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error fetching products:', errorText); // Improved error logging
                throw new Error(`Could not fetch items. Status: ${response.status}, Message: ${errorText}`);
            }

            const result = await response.json();
            setItems(result);
            // console.log('Fetched items:', result); // Log the fetched items

        } catch (error) {
            console.error('Error fetching your products:', error.message);
        } finally {
            setLoading(false);
        }
    };



    const fetchFeaturedItems = async () => {
        if (selectedItem) {
            try {
                const response = await fetch(`http://192.168.100.45:8080/api/v1/featured-items/${selectedItem.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setFeaturedItems(result);
            } catch (error) {
                console.error('Error fetching featured items:', error);
            }
        }
    };

    const fetchUsername = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username'); // Fetch username
            if (storedUsername) {
                setUsername(storedUsername); // Set the username in state
            }
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };


    useEffect(() => {
        fetchCategories();
        fetchItems();
        fetchUsername();
    }, []);

    const getAggregatedCategories = () => {
        const categoryCount = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = 0;
            }
            acc[item.category]++;
            return acc;
        }, {});

        return Object.entries(categoryCount).map(([category, count]) => ({
            name: category,
            menuCount: count,
        }));
    };

    useEffect(() => {
        if (items.length > 0) {
            const aggregatedCategories = getAggregatedCategories();
            setCategories(aggregatedCategories);
        }
    }, [items]);

    const onRefresh = async () => {
        setRefreshing(true);
        console.log('Refresh started');

        try {
            await fetchCategories();
            await fetchItems();


            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Data fetched successfully');
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
            console.log('Refresh ended');
        }
    };


    useEffect(() => {
        fetchFeaturedItems();
    }, [selectedItem]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const shouldRefresh = route.params?.refresh;
            if (shouldRefresh) {
                fetchItems();
            }
        });

        return unsubscribe;
    }, [navigation, route.params]);


    if (loading) {
        return <ActivityIndicator size='small' color="green" />;
    }





    const filteredItems = items.filter(item =>
        item.product_name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAddToCart = (item) => {
        const cartItem = {
            image: item.product_image,
            name: item.product_name,
            price: item.product_price,
            quantity: 1,
            stock: item.stock
        };
        setCartItems(prevItems => [...prevItems, cartItem]);
    };

    const handleCartButtonPress = () => {
        navigation.navigate('Cart', { cartItems });
        setShowItems(false);
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleHeartPress = (index) => {
        const newHeartStates = [...heartStates];
        newHeartStates[index] = !newHeartStates[index];
        setHeartStates(newHeartStates);
    };

    const handleItemSelect = async (item) => {
        setLoading(true);
        setSelectedItem(item);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
        setSelectedItem(null);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToSale = (item) => {
        if (item.stock >= quantity) {
            const basketItem = {
                productId: item.productId,
                image: item.product_image,
                name: item.product_name,
                price: item.product_price,
                quantity: quantity,
                stock: item.stock - quantity
            };

            setBasketItems(prevItems => [...prevItems, basketItem]);
            setSaleCount(saleCount + quantity);
            closeModal();
        } else {
            alert('Not enough stock available!');
        }
    };


    const handleSalesButtonPress = () => {
        setBasketItems([]);
        navigation.navigate('Sales', { basketItems });
        setShowItems(false);
    };


    const getBasketItemCount = () => {
        return basketItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleInputChange = (value) => {
        // Allow empty input
        if (value === '') {
            setQuantity(0);
            return;
        }


        const numValue = parseInt(value, 10);


        if (!isNaN(numValue) && numValue > 0) {
            setQuantity(numValue);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: '#f8f9fa' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Appbar.Header style={{ backgroundColor: 'white', elevation: 3 }}>
                    <Appbar.Content title={`${username} 😊`} titleStyle={{ color: "#333", fontSize: 16, fontWeight: 'bold' }} />
                    <Appbar.Action icon="plus" onPress={() => navigation.navigate('CreateProduct')} color="green" />
                    <Appbar.Action icon="bell" onPress={() => navigation.navigate('Home')} color="green" />
                    <Appbar.Action icon="menu" onPress={() => navigation.navigate('Mainmenu')} color="black" />
                </Appbar.Header>
                <StatusBar style="auto" />



                <View style={styles.searchContainer}>
                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search beverages and foods"
                        placeholderTextColor='#aaa'
                        style={styles.searchInput}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filteredItems.map(item => (
                        <View key={item.id}>
                            <Card style={styles.horizontalItemContainer}>
                                <TouchableOpacity onPress={() => handleItemSelect(item)}>
                                    {item.product_image && (
                                        <Image
                                            source={{ uri: item.product_image }}
                                            style={styles.horizontalImage}
                                        />
                                    )}
                                    <Text style={styles.horizontalItemName}>{item.product_name}</Text>
                                    <Text style={styles.horizontalItemPrice}>{item.product_price}</Text>
                                    <View style={styles.buttonWrapper}>
                                        <Button onPress={() => handleAddToCart(item)} style={styles.cartButton}>
                                            <Icon name='cart-plus' size={24} color='white' />
                                        </Button>

                                        <View style={{ position: 'relative' }}>
                                            <Button onPress={() => openModal(item)} style={{ padding: 0 }}>
                                                <View style={styles.stockBadge}>
                                                    <Text style={styles.stockText}>{item.stock}</Text>
                                                </View>
                                            </Button>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Button onPress={() => openModal(item)} style={styles.basketButton}>
                                                <Icon name='shopping-basket' size={24} color='black' />
                                                {basketItems.length > 0 && (
                                                    <View style={styles.basketBadge}>

                                                    </View>
                                                )}
                                            </Button>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.categoryTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                    <View style={styles.categoryContainer}>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category, index) => (
                                <View key={index} style={styles.categoryItem}>
                                    <Card style={styles.categoryCard}>
                                        <View style={styles.categoryContent}>
                                            <Text style={styles.categoryName}>{category.name}</Text>
                                            <Text style={styles.categoryCount}>{category.menuCount} MENUS</Text>
                                        </View>
                                    </Card>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noCategories}>No Categories Available</Text>
                        )}
                    </View>
                </ScrollView>

                <View style={styles.featuredTitleContainer}>
                    <Text style={styles.featuredTitle}>Featured Beverages</Text>
                    <Text style={styles.menuCount}>40 MENUS</Text>
                </View>

                {/* Vertical Scrollable View for Items */}
                {filteredItems.map((item, index) => (
                    <View key={item.id} style={styles.verticalItemWrapper}>
                        <Card style={styles.verticalItemContainer}>
                            <TouchableOpacity onPress={() => handleItemSelect(item)}>
                                <View style={styles.verticalItemContent}>
                                    {item.product_image && (
                                        <Image
                                            source={{ uri: item.product_image }}
                                            style={styles.productImage}
                                        />
                                    )}
                                    <View style={styles.verticalItemTextContainer}>
                                        <Text style={styles.verticalItemName}>{item.product_name}</Text>
                                        <Text style={styles.verticalItemPrice}>{item.product_price}</Text>
                                        <View style={styles.verticalItemButtons}>
                                            <Button onPress={() => handleAddToCart(item)} style={styles.cartButton}>
                                                <Icon name='cart-plus' size={24} color='red' />
                                            </Button>

                                            <View style={{ position: 'relative' }}>
                                                <Button onPress={() => openModal(item)} style={{ padding: 0 }}>
                                                    <View style={styles.stockBadgeVertical}>
                                                        <Text style={styles.stockText}>{item.stock}</Text>
                                                    </View>
                                                </Button>
                                            </View>

                                            <View style={{ flex: 0 }}>
                                                <View style={{ position: 'relative' }}>
                                                    <TouchableOpacity onPress={() => openModal(item)}>
                                                        <Icon name='shopping-basket' size={20} color='black' />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>



                                    {/* <TouchableOpacity onPress={() => handleHeartPress(index)}>
                                        <Icon
                                            name='heart'
                                            color={heartStates[index] ? 'red' : 'green'}
                                            size={24}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </TouchableOpacity> */}

                                </View>
                            </TouchableOpacity>
                        </Card>
                    </View>
                ))}


            </ScrollView>

            <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Sale with us!</Text>
                        <Icon name="close" size={24} onPress={closeModal} style={styles.closeButton} />
                    </View>
                    <Card style={styles.modalItemContainer}>
                        <View style={styles.modalItemContent}>
                            {selectedItem?.product_image && (
                                <Image
                                    source={{ uri: selectedItem.product_image }}
                                    style={styles.modalImage}
                                />
                            )}
                            <View style={styles.modalItemTextContainer}>
                                <Text style={styles.modalTitle}>{selectedItem?.product_name}</Text>
                                <Text style={styles.modalPrice}>
                                    <Text style={{ color: 'black' }}>Ksh </Text>
                                    {selectedItem?.product_price}
                                </Text>
                            </View>
                        </View>
                    </Card>
                    <View style={styles.quantityContainer}>
                        <Button onPress={decreaseQuantity} style={styles.quantityButton} mode="contained">-</Button>
                        <TextInput
                            value={String(quantity)}
                            keyboardType="numeric"
                            onChangeText={handleInputChange}
                            style={styles.quantityInput}
                        />
                        <Button onPress={increaseQuantity} style={styles.quantityButton} mode="contained">+</Button>
                    </View>
                    <View style={styles.addButtonContainer}>
                        <Button onPress={() => handleAddToSale(selectedItem)}>Add to Sale</Button>
                    </View>
                </View>
            </Modal>

            <View>
                <View style={styles.footerContainer}>
                    <View style={styles.footerButton}>
                        <TouchableOpacity onPress={handleSalesButtonPress}>
                            <Icon name='shopping-basket' size={24} color='white' style={styles.footerIcon} />
                            {getBasketItemCount() > 0 && (
                                <Text style={styles.footerBadge}>{getBasketItemCount()}</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerButton}>
                        <TouchableOpacity onPress={() => handleHeartPress(1)}>
                            <Icon name='heart' size={24} color='white' style={styles.footerIcon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerButton}>
                        <TouchableOpacity onPress={handleCartButtonPress}>
                            <View style={styles.cartButtonContainer}>
                                <Icon name='shopping-cart' size={24} color='white' style={styles.footerIcon} />
                                {getCartItemCount() > 0 && (
                                    <Text style={styles.footerBadge}>{getCartItemCount()}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerButton}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Profile');
                        }} >
                            <Icon name="user" size={30} color='white' style={styles.footerIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        width: 300,
        height: 45,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        marginTop: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
        backgroundColor: 'white',
    },
    horizontalItemContainer: {
        width: 190,
        height: 230,
        backgroundColor: '#006400',
        marginLeft: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    horizontalImage: {
        width: 140,
        height: 110,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 10,
    },
    horizontalItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    horizontalItemPrice: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginBottom: 25,
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartButton: {
        marginTop: 10,
        alignItems: 'flex-start',
    },
    stockBadge: {
        width: 45,
        height: 25,
        borderRadius: 15,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -20,
        right: -10,
    },
    stockText: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        lineHeight: 12,
    },
    categoryTitle: {
        color: 'black',
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    categoryScroll: {
        marginBottom: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    categoryItem: {
        marginHorizontal: 5,
    },
    categoryCard: {
        width: 200,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
    },
    categoryContent: {
        alignItems: 'center',
        padding: 10,
    },
    categoryName: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryCount: {
        color: 'green',
        fontSize: 14,
    },
    noCategories: {
        color: 'black',
        fontSize: 16,
    },
    featuredTitleContainer: {
        paddingHorizontal: 10,
        marginBottom: 0,
    },
    featuredTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
    menuCount: {
        color: 'green',
        fontSize: 14,
    },
    verticalItemWrapper: {
        marginVertical: 10,
    },
    verticalItemContainer: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    verticalItemContent: {
        padding: 10,
        flexDirection: 'row',
    },
    productImage: {
        width: 140,
        height: 120,
        borderRadius: 10,
    },
    verticalItemTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    verticalItemName: {
        color: 'black',
        fontSize: 16,
    },
    verticalItemPrice: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    verticalItemButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stockBadgeVertical: {
        width: 45,
        height: 25,
        borderRadius: 15,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -20,
        right: 0,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 20,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        alignItems: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10,
        marginTop: 10,
    },
    closeButton: {
        color: 'red',
        marginLeft: 90,
    },
    modalItemContainer: {
        width: '110%',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        marginBottom: 10,
    },
    modalItemContent: {
        flexDirection: 'row',
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 20,
    },
    modalPrice: {
        fontSize: 16,
        color: 'green',
        marginBottom: 20,
        textAlign: 'right',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantityButton: {
        fontSize: 24,
        paddingVertical: 6,
        paddingHorizontal: 3,
        borderRadius: 60,
        backgroundColor: 'green',
        color: 'white',
    },
    quantityInput: {
        width: 80,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
    },
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: 'white',
    },
    footerButton: {
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 50,
        width: 40,
        height: 40,
    },
    cartButtonContainer: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 50,
        width: 40,
        height: 40,
    },
    footerIcon: {
        marginTop: 5,
        marginLeft: 1,
    },
    footerBadge: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 2,
        color: 'white',
    },
    heartIcon: {
        marginLeft: 10,
    },
});

export default Items;
