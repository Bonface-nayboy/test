// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { Image, TouchableOpacity, ScrollView, View, StyleSheet, TextInput, Modal } from 'react-native';
// import { Text, Card, Button } from 'react-native-paper';
// import Toast from 'react-native-toast-message';
// import Icon from 'react-native-vector-icons/FontAwesome';

// export default function Purchases() {
//     const [items, setItems] = useState([]);
//     const [basket, setBasket] = useState({});
//     const [buyPrices, setBuyPrices] = useState({});
//     const [quantities, setQuantities] = useState({});
//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [isPostEnabled, setIsPostEnabled] = useState(false);

//     const navigation = useNavigation();

//     const paymentMethods = [
//         { id: 'cash', name: 'Cash                                   💰', icon: 'money' },
//         { id: 'mpesa', name: 'Mpesa                                  📲', icon: 'mobile' },
//         { id: 'cheque', name: 'Cheque                               ✅', icon: 'check' },
//     ];

//     const fetchItems = async () => {
//         try {
//             const userEmail = await AsyncStorage.getItem('userEmail');
//             const response = await fetch(`http://192.168.100.45:8080/api/v1/model?email=${userEmail}`);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result = await response.json();
//             setItems(result);
//         } catch (error) {
//             console.error('Error fetching the products:', error);
//         }
//     };

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     useEffect(() => {

//         setIsPostEnabled(selectedPaymentMethod === 'cash' || (selectedPaymentMethod === 'mpesa' && mobileNumber.length === 10));
//     }, [selectedPaymentMethod, mobileNumber]);

//     const handleToggleItem = (item) => {
//         setBasket((prev) => ({
//             ...prev,
//             [item.id]: prev[item.id] ? undefined : { ...item },
//         }));

//         if (!basket[item.id]) {
//             setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
//             setBuyPrices((prev) => ({ ...prev, [item.id]: '' }));
//         }
//     };

//     const handlePostPurchases = async () => {
//         const selectedItems = Object.entries(basket)
//             .filter(([_, item]) => item)
//             .map(([id]) => ({
//                 productId: basket[id].productId,
//                 productName: basket[id].product_name,
//                 buyPrice: buyPrices[id] ? parseFloat(buyPrices[id]) : 0,
//                 quantity: quantities[id] || 0,
//             }));

//         if (selectedItems.length === 0) {
//             alert("Please select at least one item to purchase.");
//             return;
//         }

//         const purchaseData = selectedItems.map(item => ({
//             ...item,
//             paymentMethod: selectedPaymentMethod,
//             mobileNumber: selectedPaymentMethod === 'mpesa' ? mobileNumber : '',
//         }));

//         console.log("Purchase Data:", JSON.stringify(purchaseData, null, 2));

//         try {
//             const userEmail = await AsyncStorage.getItem('userEmail');
//             const response = await fetch(`http://192.168.100.45:8080/api/v1/purchases/multiple?email=${userEmail}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(purchaseData),
//             });

//             if (!response.ok) {
//                 const errorResponse = await response.json();
//                 alert(`Error: ${errorResponse.error}`);
//                 console.error('Error Response:', errorResponse);
//                 return;
//             }

//             setBasket({});
//             setBuyPrices({});
//             setQuantities({});
//             setSelectedPaymentMethod(null);
//             setMobileNumber('');
//             setModalVisible(false);
//             Toast.show({
//                 type: 'success',
//                 text1: 'Purchases have been successfully posted',
//                 text2: 'Now you can sell the items!'
//             });
//             navigation.navigate('Items');
//         } catch (error) {
//             console.error('Error posting the purchases:', error);
//         }
//     };



//     return (
//         <View style={styles.container}>
//             {/* <Text style={styles.title}>Purchases</Text> */}
//             <ScrollView>
//                 {items.map((item) => (
//                     <Card key={item.id} style={styles.card}>
//                         <TouchableOpacity onPress={() => handleToggleItem(item)}>
//                             <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
//                                 {item.product_image && (
//                                     <Image
//                                         source={{ uri: item.product_image }}
//                                         style={styles.image}
//                                     />
//                                 )}
//                                 <View style={{ marginLeft: 10, flexDirection: 'column', flex: 1 }}>
//                                     <Text style={styles.productName}>{item.product_name}</Text>
//                                     {item.stock > 0 && (
//                                         <Text style={styles.quantity}>Available: {item.stock}</Text>
//                                     )}
//                                     {basket[item.id] && (
//                                         <View style={{ marginTop: 5 }}>
//                                             <TextInput
//                                                 placeholder="Buy Price"
//                                                 keyboardType="numeric"
//                                                 value={buyPrices[item.id]}
//                                                 onChangeText={(text) => setBuyPrices(prev => ({ ...prev, [item.id]: text }))}
//                                                 style={[styles.input, { marginBottom: 10 }]}
//                                             />
//                                             <TextInput
//                                                 placeholder="Quantity"
//                                                 keyboardType="numeric"
//                                                 value={quantities[item.id]?.toString() || ''}
//                                                 onChangeText={(text) => setQuantities(prev => ({ ...prev, [item.id]: text ? parseInt(text, 10) : '' }))}
//                                                 style={styles.input}
//                                             />
//                                         </View>
//                                     )}
//                                 </View>
//                             </View>

//                         </TouchableOpacity>
//                     </Card>
//                 ))}
//             </ScrollView>
//             <Button onPress={() => setModalVisible(true)} mode="contained" style={{ backgroundColor: '#006400', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 }}>
//                 <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Confirm Purchases</Text>
//             </Button>
//             <Modal visible={modalVisible} animationType="slide" transparent={true}>
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>Payment Method</Text>
//                         {paymentMethods.map((method) => (
//                             <TouchableOpacity
//                                 key={method.id}
//                                 onPress={() => setSelectedPaymentMethod(method.id)}
//                                 style={[
//                                     styles.paymentMethod,
//                                     selectedPaymentMethod === method.id && styles.selectedPaymentMethod,
//                                 ]}
//                             >
//                                 <Icon name={method.icon} size={30} />
//                                 <Text style={styles.methodText}>{method.name}</Text>
//                             </TouchableOpacity>
//                         ))}
//                         {selectedPaymentMethod === 'mpesa' && (
//                             <TextInput
//                                 placeholder="Enter Mobile Number"
//                                 value={mobileNumber}
//                                 onChangeText={setMobileNumber}
//                                 style={styles.input}
//                             />
//                         )}
//                         <Button
//                             onPress={handlePostPurchases}
//                             mode="contained"
//                             disabled={!isPostEnabled}
//                             style={[
//                                 styles.submitButton,
//                                 isPostEnabled && {
//                                     backgroundColor: '#006400',
//                                     paddingVertical: 10,
//                                     paddingHorizontal: 10,
//                                     borderRadius: 25,
//                                     marginTop: 10,
//                                 },
//                             ]}
//                         >
//                             <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
//                                 Post Purchases
//                             </Text>
//                         </Button>

//                         <Button onPress={() => setModalVisible(false)} mode="text" style={styles.closeButton}>
//                             Close
//                         </Button>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor: 'white',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginVertical: 0,
//     },
//     card: {
//         marginBottom: 12,
//         borderRadius: 8,
//         height: 170,
//         backgroundColor: 'white',
//         width: 330,
//     },
//     image: {
//         height: 100,
//         width: '40%',
//         borderRadius: 8,
//         marginLeft: 3,
//         marginTop: 20,

//     },
//     productName: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginTop: 10,
//         marginLeft: 4,
//         color: 'Black'
//     },
//     quantity: {
//         fontSize: 14,
//         color: 'green',
//     },
//     inputContainer: {
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginTop: 8,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 8,
//         width: '80%', // Set to 100% for full width
//     },
//     button: {
//         marginTop: 16,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         padding: 20,
//         marginHorizontal: 20,
//         borderRadius: 10,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//     paymentMethod: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         marginVertical: 5,
//         borderRadius: 5,
//         backgroundColor: '#f0f0f0',
//     },
//     selectedPaymentMethod: {
//         backgroundColor: '#3CB371',
//     },
//     methodText: {
//         marginLeft: 10,
//         fontSize: 18,
//     },
//     submitButton: {
//         marginTop: 15,
//     },
//     closeButton: {
//         marginTop: 10,
//     },
// });





import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, ScrollView, View, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
// import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Purchases() {
    const [items, setItems] = useState([]);
    const [basket, setBasket] = useState({});
    const [buyPrices, setBuyPrices] = useState({});
    const [quantities, setQuantities] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [isPostEnabled, setIsPostEnabled] = useState(false);

    const navigation = useNavigation();

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
            console.error('Error fetching the products:', error);
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
            setBuyPrices((prev) => ({ ...prev, [item.id]: '' }));
        }
    };

    const handleCalculateTotalPrice = () => {
        return Object.entries(basket).reduce((total, [id, item]) => {
            const price = parseFloat(buyPrices[id]) || 0;
            return total + (price * (quantities[id] || 0));
        }, 0).toFixed(2);
    };

    const handlePostPurchases = async () => {
        const selectedItems = Object.entries(basket)
            .filter(([_, item]) => item)
            .map(([id]) => ({
                productId: basket[id].productId,
                productName: basket[id].product_name,
                buyPrice: buyPrices[id] ? parseFloat(buyPrices[id]) : 0,
                quantity: quantities[id] || 0,
            }));

        if (selectedItems.length === 0) {
            alert("Please select at least one item to purchase.");
            return;
        }

        const purchaseData = selectedItems.map(item => ({
            ...item,
            paymentMethod: selectedPaymentMethod,
            mobileNumber: selectedPaymentMethod === 'mpesa' ? mobileNumber : '',
        }));

        console.log("Purchase Data:", JSON.stringify(purchaseData, null, 2));

        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            const response = await fetch(`https://gunners-7544551f4514.herokuapp.com/api/v1/purchases/multiple?email=${userEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                alert(`Error: ${errorResponse.error}`);
                console.error('Error Response:', errorResponse);
                return;
            }

            const totalPrice = handleCalculateTotalPrice(); // Calculate total price

            // Reset the form
            setBasket({});
            setBuyPrices({});
            setQuantities({});
            setSelectedPaymentMethod(null);
            setMobileNumber('');
            setModalVisible(false);

            // Show success toast message
            // Toast.show({
            //     type: 'success',
            //     text1: 'Purchases have been successfully posted',
            //     text2: 'Now you can sell the items!',
            // });
            Alert.alert('Purchases have been successfully posted');

            // Navigate to Receipt screen and pass purchase data and total price
            // navigation.navigate('PurchaseReceipt', { purchaseData, totalPrice });

        } catch (error) {
            console.error('Error posting the purchases:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {items.map((item) => (
                    <Card key={item.id} style={styles.card}>
                        <TouchableOpacity onPress={() => handleToggleItem(item)}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                {item.product_image && (
                                    <Image
                                        source={{ uri: item.product_image }}
                                        style={styles.image}
                                    />
                                )}
                                <View style={{ marginLeft: 10, flexDirection: 'column', flex: 1 }}>
                                    <Text style={styles.productName}>{item.product_name}</Text>
                                    {item.stock > 0 && (
                                        <Text style={styles.quantity}>Available: {item.stock}</Text>
                                    )}
                                    {basket[item.id] && (
                                        <View style={{ marginTop: 5 }}>
                                            <TextInput
                                                placeholder="Buy Price"
                                                keyboardType="numeric"
                                                value={buyPrices[item.id]}
                                                onChangeText={(text) => setBuyPrices(prev => ({ ...prev, [item.id]: text }))}
                                                style={[styles.input, { marginBottom: 10 }]}
                                            />
                                            <TextInput
                                                placeholder="Quantity"
                                                keyboardType="numeric"
                                                value={quantities[item.id]?.toString() || ''}
                                                onChangeText={(text) => setQuantities(prev => ({ ...prev, [item.id]: text ? parseInt(text, 10) : '' }))}
                                                style={styles.input}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>
                ))}
            </ScrollView>
            <Button onPress={() => setModalVisible(true)} mode="contained" style={{ backgroundColor: '#006400', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Confirm Purchases</Text>
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
                            onPress={handlePostPurchases}
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
                                Post Purchases
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 0,
    },
    card: {
        marginBottom: 12,
        borderRadius: 8,
        height: 170,
        backgroundColor: 'white',
        width: 330,
    },
    image: {
        height: 100,
        width: '40%',
        borderRadius: 8,
        marginLeft: 3,
        marginTop: 20,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        marginLeft: 4,
        color: 'Black'
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
        width: '80%', // Set to 100% for full width
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
});

