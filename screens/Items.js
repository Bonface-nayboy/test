import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Image, TouchableOpacity, RefreshControl, } from 'react-native';
import { ActivityIndicator, Appbar, TextInput, Text, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBasket } from '../BasketContext';

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [username, setUsername] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);
    const [prices, setPrices] = useState({});
    const [quantities, setQuantities] = useState({});
    const navigation = useNavigation();
    const { basketItems, addItemToBasket } = useBasket();

    const handleItemSelect = (item) => {
        setSelectedItemDetails(selectedItemDetails && selectedItemDetails.id === item.id ? null : item);
    };

    const handleCategorySelect = (category) => {
        navigation.navigate('Category', { categoryName: category.name });
    };

    const getAggregatedCategories = () => {
        const categoryCount = items.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(categoryCount).map(([category, count]) => ({
            name: category,
            menuCount: count,
        }));
    };

    // Move fetchItems function to the top level
    const fetchItems = async () => {
        setLoading(true); // Set loading to true when fetching items
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            const response = await fetch(`https://backend-rees-realme.onrender.com/api/v1/model?email=${userEmail}`);
            if (!response.ok) throw new Error(`Could not fetch items. Status: ${response.status}`);
            const result = await response.json();
            setItems(result);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching completes
        }
    };

    const fetchUsername = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };

    useEffect(() => {
        fetchUsername();
        fetchItems(); // Call fetchItems when the component mounts
    }, []);

    useEffect(() => {
        if (items.length) {
            setCategories(getAggregatedCategories());
        }
    }, [items]);

    const onRefresh = async () => {
        await fetchItems(); // Call the fetchItems function for refresh
    };

    const addItemToBasketHandler = () => {
        if (selectedItemDetails) {
            const quantity = quantities[selectedItemDetails.id] || 1;
            const price = prices[selectedItemDetails.id] ? parseFloat(prices[selectedItemDetails.id]) : parseFloat(selectedItemDetails.product_price); // Get adjusted or default price
            const itemToAdd = {
                ...selectedItemDetails,
                quantity,
                price,  // Include the price in the item
            };
            addItemToBasket(itemToAdd);
            setSelectedItemDetails(null);
            setQuantities(prev => ({ ...prev, [selectedItemDetails.id]: 1 }));
            setPrices(prev => ({ ...prev, [selectedItemDetails.id]: selectedItemDetails.product_price.toString() }));
        }
    };


    const handleBasketPress = () => {
        if (basketItems.length > 0) {
            navigation.navigate('Sales', { basketItems, prices });
        } else {
            console.warn('Basket is empty!');
        }
    };



    if (loading) {
        return <ActivityIndicator size="small" color="green" />;
    }

    const filteredItems = items.filter(item =>
        item.product_name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: '#f8f9fa' }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
            >
                <Appbar.Header style={{ backgroundColor: 'white', elevation: 3 }}>
                    <Appbar.Content title={`${username} 😊`} titleStyle={{ color: "#333", fontSize: 16, fontWeight: 'bold' }} />
                    <Appbar.Action icon="plus" onPress={() => navigation.navigate('CreateProduct')} color="green" />
                    <Appbar.Action icon="bell" onPress={() => navigation.navigate('Home')} color="green" />
                    <Appbar.Action icon="menu" onPress={() => navigation.navigate('Mainmenu')} color="black" />
                </Appbar.Header>
                <StatusBar style="auto" />
                <View style={styles.searchBarContainer}>
                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search your products ..."
                        placeholderTextColor='black'
                        style={[styles.searchInput, { color: 'black' }]}
                    />
                </View>
                <Text style={styles.featuredTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                    <View style={styles.categoryContainer}>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <View key={index} style={styles.categoryItem}>
                                    <TouchableOpacity onPress={() => handleCategorySelect(category)}>
                                        <Card style={styles.categoryCard}>
                                            <View style={styles.categoryContent}>
                                                <Text style={styles.categoryName}>{category.name}</Text>
                                                {/* <Text style={styles.categoryCount}>{category.menuCount} items</Text> */}
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noCategories}>No Categories Available</Text>
                        )}
                    </View>
                </ScrollView>
                <Text style={styles.featuredTitle}>Products</Text>
                {filteredItems.map((item) => {
                    const isOutOfStock = item.stock <= 0; // Check stock status here

                    return (
                        <View key={item.id} style={styles.verticalItemWrapper}>
                            <View style={styles.verticalItemContainer}>
                                {isOutOfStock && (
                                    <View style={styles.outOfStockBanner}>
                                        <Text style={styles.bannerText}>STOCK DEPLETED</Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    onPress={() => handleItemSelect(item)}
                                    disabled={isOutOfStock} // Disable if out of stock
                                    style={[styles.card, isOutOfStock ? styles.disabledItem : null]} // Change styles based on stock
                                >
                                    <View style={styles.verticalItemContent}>
                                        {item.product_image && (
                                            <Image
                                                source={{ uri: item.product_image }}
                                                style={styles.productImage}
                                            />
                                        )}
                                        <View style={styles.verticalItemTextContainer}>
                                            <Text style={styles.verticalItemName}>{item.product_name}</Text>
                                            <Text style={styles.verticalItemPrice}>Ksh {item.product_price}</Text>
                                            {selectedItemDetails && selectedItemDetails.id === item.id && (
                                                <View style={styles.itemDetailContainer}>
                                                    <View style={styles.priceQuantityContainer}>
                                                        <View style={styles.quantityCircle}>
                                                            {item.stock > 0 && (
                                                                <Text style={styles.quantityText}>
                                                                    {item.stock}
                                                                </Text>
                                                            )}
                                                        </View>
                                                        <TextInput
                                                            placeholder="Sale Price"
                                                            keyboardType="numeric"
                                                            value={prices[item.id] ? prices[item.id].toString() : item.product_price.toString()}
                                                            onChangeText={(text) => setPrices(prev => ({ ...prev, [item.id]: text }))}
                                                            style={[styles.input, { marginBottom: 3 , color: 'black'}]}
                                                        />
                                                        <TextInput
                                                            placeholder="Quantity"
                                                            keyboardType="numeric"
                                                            value={quantities[item.id]?.toString() || ''}
                                                            onChangeText={(text) => setQuantities(prev => ({ ...prev, [item.id]: text ? parseInt(text, 10) : 0 }))}
                                                            style={[styles.input, { color: 'black' }]}
                                                        />
                                                    </View>
                                                    <Button
                                                        style={{ backgroundColor: '#006400' }}
                                                        onPress={addItemToBasketHandler}
                                                        mode="contained"
                                                    >
                                                        <Icon name="shopping-basket" color="white" size={20} />
                                                    </Button>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}


            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.footerButton}>
                    <TouchableOpacity onPress={handleBasketPress}>
                        <Icon name='shopping-basket' size={24} color='white' style={styles.footerIcon} />
                        {basketItems.length > 0 && (
                            <View style={styles.footerBadge}>
                                <Text style={styles.footerBadgeText}>
                                    {basketItems.reduce((total, item) => total + item.quantity, 0)}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.footerButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('Heart')}>
                        <Icon name='heart' size={24} color='white' style={styles.footerIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('Purchases')}>
                        <Icon name='shopping-cart' size={24} color='white' style={styles.footerIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Icon name="user" size={30} color='white' style={styles.footerIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        padding: 10,
    },
    searchInput: {
        height: 40,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        color: 'black',
    },
    categoryScroll: {
        marginBottom: 3,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    categoryItem: {
        marginHorizontal: 5,
    },
    categoryCard: {
        width: 120,
        height: 40,
        backgroundColor: '#006400',
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
    },
    categoryContent: {
        alignItems: 'center',
        padding: 10,
    },
    categoryName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    categoryCount: {
        color: 'white',
        fontSize: 12,
    },
    noCategories: {
        color: 'black',
        fontSize: 16,
    },
    featuredTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 5,
        textAlign: "center"
    },
    verticalItemWrapper: {
        flex: 1,
        marginVertical: 10,
    },
    verticalItemContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: "white"
    },
    verticalItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,

    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    verticalItemTextContainer: {
        flex: 1,
    },
    verticalItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    verticalItemPrice: {
        fontSize: 14,
        color: 'green',
    },
    itemDetailContainer: {
        marginTop: 10,
    },
    priceQuantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    quantityCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    quantityText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 0,
        padding: 8,
        width: '80%',
        height: 4,
        backgroundColor: "white",
        color: "black",
        textAlign: "left",
        margin: 5
    },
    itemDetailContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceQuantityContainer: {
        flexDirection: 'column',
        flex: 1,
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
        width: 35,
        height: 35,
    },
    footerIcon: {
        marginTop: 5,
    },
    footerBadge: {
        position: 'absolute',
        right: -10,
        top: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 2,
    },
    footerBadgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    outOfStockBanner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 215, 0, 0.5)',  // Semi-transparent gold background
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure it is above other components
    },
    bannerText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center",
        marginTop: 40
    },
    disabledItem: {
        opacity: 0.5, // visual indication that item is disabled
    },
});

export default Items;
