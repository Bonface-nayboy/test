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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItems, setModalItems] = useState([]);
    const route = useRoute();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            const response = await fetch(`https://gunners-7544551f4514.herokuapp.com/api/v1/model?email=${userEmail}`);

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

            const response = await fetch(`https://gunners-7544551f4514.herokuapp.com/api/v1/model?email=${userEmail}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error fetching products:', errorText);
                throw new Error(`Could not fetch items. Status: ${response.status}, Message: ${errorText}`);
            }

            const result = await response.json();
            setItems(result);
        } catch (error) {
            console.error('Error fetching your products:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFeaturedItems = async () => {
        if (selectedItem) {
            try {
                const response = await fetch(`https://gunners-7544551f4514.herokuapp.com/api/v1/featured-items/${selectedItem.id}`);
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
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
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

    const handleItemSelect = (item) => {
        setSelectedItem(item);
    };



    useEffect(() => {
        console.log("Current selectedCategory: ", selectedCategory);
    }, [selectedCategory]);

    const filteredItem = selectedCategory
        ? items.filter(item => item.category === selectedCategory)
        : items;


    const handleCategorySelect = async (category) => {
        setSelectedCategory(category.name);
        console.log("Selected category: ", category.name);
        // Fetch items for this category; assuming each item has a 'category' property
        const itemsForCategory = items.filter(item => item.category === category.name);
        setModalItems(itemsForCategory);
        setModalVisible(true); // Show the modal
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalItems([]); // Clear modal items when closing
        setSelectedCategory(null); // Optionally reset selected category
    };

    if (loading) {
        return <ActivityIndicator size='small' color="green" />;
    }

    const filteredItems = items.filter(item =>
        item.product_name.toLowerCase().includes(searchText.toLowerCase())
    );
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
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="Search your products ..."
                            placeholderTextColor='#aaa'
                            style={styles.searchInput}
                        />
                    </View>
                </View>
                <Text style={styles.featuredTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                    <View style={styles.categoryContainer}>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category, index) => (
                                <View key={index} style={styles.categoryItem}>
                                    <TouchableOpacity onPress={() => handleCategorySelect(category)}>
                                        <Card style={styles.categoryCard}>
                                            <View style={styles.categoryContent}>
                                                <Text style={styles.categoryName}>{category.name}</Text>
                                                <Text style={styles.categoryCount}>{category.menuCount} Menus</Text>
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



                <View style={styles.featuredTitleContainer}>
                    <Text style={styles.featuredTitle}>Products</Text>

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
                                        <Text style={styles.verticalItemPrice}>Ksh {item.product_price}</Text>
                                        <View style={styles.verticalItemButtons}>
                                            <View style={styles.stockBadgeVertical}>
                                                <Text style={styles.stockText}>{item.stock}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                    </View>
                ))
                }
            </ScrollView >

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Items in {selectedCategory}</Text>
                        <ScrollView>
                            {/* Mapping through modalItems */}
                            {modalItems.length > 0 ? (
                                modalItems.map((item) => (
                                    <View key={item.id} style={styles.modalItem}>
                                        <Text style={styles.modalItemName}>{item.product_name}</Text>
                                        <Text style={styles.modalItemPrice}>Ksh {item.product_price}</Text>
                                        {/* Add other item details or functionality */}
                                    </View>
                                ))
                            ) : (
                                <Text>No items found in this category.</Text>
                            )}
                        </ScrollView>
                        <View style={{
                            alignContent: 'center',
                            justifyContent: 'center'
                        }} >
                            <Button mode="contained" onPress={closeModal} style={styles.closeModalButton}>
                                Close
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>


            <View>
                <View style={styles.footerContainer}>
                    <View style={styles.footerButton}>
                        <TouchableOpacity onPress={() => navigation.navigate('MainSales')}>
                            <Icon name='shopping-basket' size={24} color='white' style={styles.footerIcon} />

                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerButton}>
                        <TouchableOpacity onPress={() => navigation.navigate('CoolScreen')}>
                            <Icon name='heart' size={24} color='white' style={styles.footerIcon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerButton}>
                        {/* <TouchableOpacity onPress={handleCartButtonPress}> */}
                        <TouchableOpacity onPress={() => navigation.navigate('Purchases')}>
                        <View style={styles.cartButtonContainer}>
                            <Icon name='shopping-cart' size={24} color='white' style={styles.footerIcon} />
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
        </View >
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        flex: 1,                  // Take full height to center vertically
        justifyContent: 'center', // Center contents vertically
        alignItems: 'center',     // Center contents horizontally
    },
    searchContainer: {
        width: 250,              // Set width
        height: 45,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
        // Removed marginLeft
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
        backgroundColor: 'white',
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
    verticalItemButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    stockBadgeVertical: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,  // Adjusts position relative to the right side of the card
    },
    stockText: {
        color: 'white',
        fontWeight: 'bold',
    },
    categoryTitle: {
        color: 'black',
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: 'bold',
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
        width: 200,
        height: 80,
        backgroundColor: '#006400',
        borderRadius: 10,
        elevation: 3,
    },
    categoryContent: {
        alignItems: 'center',
        padding: 10,
    },
    categoryName: {
        color: 'white',
        fontSize: 16,
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
    featuredTitleContainer: {
        paddingHorizontal: 0,
        marginBottom: 0,
    },
    featuredTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 5,
        textAlign: "center"
    },
    menuCount: {
        color: 'green',
        fontSize: 14,
    },
    verticalItemWrapper: {
        marginVertical: 10,
    },
    verticalItemContainer: {
        width: '90%',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginLeft: '5%', // Centers the card horizontally if the width is 90%
    }
    ,
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
    modalContainer: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 20, // Optional, to add padding on sides
    },
    modalContent: {
        width: '100%',
        maxHeight: 300, // Constrain the height to fit on smaller screens
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        marginBottom: 15, // Space between items
    },
    modalItemName: {
        fontSize: 16,
    },
    modalItemPrice: {
        fontSize: 14,
    },
    closeModalButton: {
        marginTop: 20,
    },
});

export default Items;
