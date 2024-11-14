import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ScrollView, View, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Category = () => {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { categoryName } = route.params || {}; 

    if (!categoryName) {
        return null; 
    }

    const [items, setItems] = useState([]);
    const [basket, setBasket] = useState({});
    const [prices, setPrice] = useState({});
    const [quantities, setQuantities] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [isPostEnabled, setIsPostEnabled] = useState(false);

    const paymentMethods = [
        { id: 'cash', name: 'Cash                                   💰', icon: 'money' },
        { id: 'mpesa', name: 'Mpesa                                  📲', icon: 'mobile' },
        { id: 'cheque', name: 'Cheque                               ✅', icon: 'check' },
    ];

    const fetchItems = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            const response = await fetch(`https://gunners-7544551f4514.herokuapp.com/api/v1/model?email=${userEmail}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setItems(result);
        } catch (error) {
            console.error('Error fetching the products:', error.message);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        setIsPostEnabled(selectedPaymentMethod === 'cash' || (selectedPaymentMethod === 'mpesa' && mobileNumber.length === 10));
    }, [selectedPaymentMethod, mobileNumber]);

    const handleToggleItem = (item) => {
        setBasket((prev) => ({
            ...prev,
            [item.id]: prev[item.id] ? undefined : { ...item },
        }));

        if (!basket[item.id]) {
            setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
            setPrice((prev) => ({ ...prev, [item.id]: '' }));
        }
    };

    const handlePostSales = async () => {
        const selectedItems = Object.entries(basket)
            .filter(([_, item]) => item)
            .map(([id]) => ({
                productId: basket[id].productId,
                productName: basket[id].product_name,
                price: prices[id] ? parseFloat(prices[id]) : 0,
                quantity: quantities[id] || 0,
            }));

        if (selectedItems.length === 0) {
            Alert.alert("Please select at least one item to sell.");
            return;
        }

        const salesData = selectedItems.map(item => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            paymentMethod: selectedPaymentMethod,
            mobileNumber: selectedPaymentMethod === 'mpesa' ? mobileNumber : '',
        }));

        console.log("Sales Data:", JSON.stringify(salesData, null, 2));

        try {
            const userEmail = await AsyncStorage.getItem('userEmail');

            const response = await fetch(`https://gunners-7544551f4514.herokuapp.com/api/v1/sales/bulk?email=${userEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(salesData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to post sales data: ${errorText}`);
            }

            const result = await response.json();
            console.log('Fetched items:', result);
           
            setModalVisible(false);
            Alert.alert('Sales Posted successfully !');
            navigation.navigate('Items');
        } catch (error) {
            Alert.alert(`Error posting sales: ${error.message}`);
            console.error('Error posting sale:', error);
        }
    };

    const calculateTotalPrice = () => {
        return Object.entries(basket).reduce((total, [id, item]) => {
            const price = parseFloat(prices[id]) || 0;
            return total + (price * (quantities[id] || 0));
        }, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products in {categoryName}</Text>
            <ScrollView>
                {items.filter(item => item.category === categoryName).map((item) => {
                    const isOutOfStock = item.stock <= 0; // Check stock status

                    return (
                        <Card key={item.id} style={styles.card}>
                            <TouchableOpacity 
                                onPress={!isOutOfStock ? () => handleToggleItem(item) : null} // Disable onPress if out of stock
                                disabled={isOutOfStock} // Disable interaction if out of stock
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', position: 'relative' }}>
                                    {item.product_image && (
                                        <Image
                                            source={{ uri: item.product_image }}
                                            style={styles.image}
                                        />
                                    )}
                                    <View style={{ marginLeft: 10, flexDirection: 'column', flex: 1 }}>
                                        <Text style={styles.productName}>{item.product_name}</Text>
                                        {isOutOfStock ? (
                                            <Text style={styles.quantity}>Out of Stock</Text>
                                        ) : (
                                            <Text style={styles.quantity}>Available: {item.stock}</Text>
                                        )}
                                        {basket[item.id] && (
                                            <View style={{ marginTop: 5 }}>
                                                <TextInput
                                                    placeholder="Sale Price"
                                                    keyboardType="numeric"
                                                    value={prices[item.id]}
                                                    onChangeText={(text) => setPrice(prev => ({ ...prev, [item.id]: text }))}
                                                    style={[styles.input, { marginBottom: 3 }]}
                                                />
                                                <TextInput
                                                    placeholder="Quantity"
                                                    keyboardType="numeric"
                                                    value={quantities[item.id]?.toString() || ''}
                                                    onChangeText={(text) => setQuantities(prev => ({ ...prev, [item.id]: text ? parseInt(text, 10) : '' }))}
                                                    style={[styles.input, { marginBottom: 3 }]}
                                                />
                                            </View>
                                        )}
                                    </View>
                                    {isOutOfStock && (
                                        <View style={styles.outOfStockBanner}>
                                            <Text style={styles.bannerText}>STOCK DEPLETED</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </Card>
                    );
                })}
            </ScrollView>
            <Button onPress={() => setModalVisible(true)} mode="contained" style={{ backgroundColor: '#006400', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Confirm Sales</Text>
            </Button>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Payment Method</Text>
                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                onPress={() => setSelectedPaymentMethod(method.id)}
                                style={[
                                    styles.paymentMethod,
                                    selectedPaymentMethod === method.id && styles.selectedPaymentMethod,
                                ]}
                            >
                                <Icon name={method.icon} size={30} />
                                <Text style={styles.methodText}>{method.name}</Text>
                            </TouchableOpacity>
                        ))}
                        {selectedPaymentMethod === 'mpesa' && (
                            <TextInput
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                                style={styles.input}
                            />
                        )}
                        <Button
                            onPress={handlePostSales}
                            mode="contained"
                            disabled={!isPostEnabled}
                            style={[
                                styles.submitButton,
                                isPostEnabled && {
                                    backgroundColor: '#006400',
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    borderRadius: 25,
                                    marginTop: 10,
                                },
                            ]}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                Post Sales
                            </Text>
                        </Button>
                        <Button onPress={() => setModalVisible(false)} mode="text" style={styles.closeButton}>
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: 'black',
    },
    card: {
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        padding:0
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 8,
        marginLeft: 3,
        marginTop: 20,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginLeft: 4,
        color: 'Black',
    },
    quantity: {
        fontSize: 14,
        color: 'green',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        width: '80%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    selectedPaymentMethod: {
        backgroundColor: '#3CB371',
    },
    methodText: {
        marginLeft: 10,
        fontSize: 18,
    },
    submitButton: {
        marginTop: 15,
    },
    closeButton: {
        marginTop: 10,
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
        textAlign:"center",
        marginTop:40
    },
    disabledItem: {
        opacity: 0.5, // visual indication that item is disabled
    },
});

export default Category;
