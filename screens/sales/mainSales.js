// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { Image, TouchableOpacity, ScrollView, View, StyleSheet, TextInput, Modal} from 'react-native';
// import { Text, Card, Button } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';

// export default function MainSales() {
//     const [items, setItems] = useState([]);
//     const [basket, setBasket] = useState({});
//     const [prices, setPrice] = useState({});
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
//             setPrice((prev) => ({ ...prev, [item.id]: '' }));
//         }
//     };

//     const handlePostSales = async () => {
//         const selectedItems = Object.entries(basket)
//             .filter(([_, item]) => item)
//             .map(([id]) => ({
//                 productId: basket[id].productId,
//                 productName: basket[id].product_name,
//                 price: prices[id] ? parseFloat(prices[id]) : 0,
//                 quantity: quantities[id] || 0,
//             }));

//         if (selectedItems.length === 0) {
//             alert("Please select at least one item to sell.");
//             return;
//         }

//         const salesData = selectedItems.map(item => ({
//             ...item,
//             paymentMethod: selectedPaymentMethod,
//             mobileNumber: selectedPaymentMethod === 'mpesa' ? mobileNumber : '',
//         }));

//         console.log("Sales Data:", JSON.stringify(salesData, null, 2));

//         try {
//             const userEmail = await AsyncStorage.getItem('userEmail');

//             const response = await fetch(`http://192.168.100.45:8080/api/v1/sales/bulk?email=${userEmail}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(salesData),
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Failed to post sales data: ${errorText}`);
//             }

//             const result = await response.json();
//             console.log('Fetched items:', result);
//             ToastAndroid.show('Sales posted successfully!', ToastAndroid.SHORT);
//             setModalVisible(false);

//             const totalPrice = calculateTotalPrice();
//             navigation.navigate('Receipt', { salesData, totalPrice });

//         } catch (error) {
//             alert(`Error posting sales: ${error.message}`);
//             console.error('Error posting sale:', error);
//         }
//     };

//     const calculateTotalPrice = () => {
//         return Object.entries(basket).reduce((total, [id, item]) => {
//             const price = parseFloat(prices[id]) || 0;
//             return total + (price * (quantities[id] || 0));
//         }, 0).toFixed(2);
//     };

//     return (
//         <View style={styles.container}>
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
//                                                 placeholder="Sale Price"
//                                                 keyboardType="numeric"
//                                                 value={prices[item.id]}
//                                                 onChangeText={(text) => setPrice(prev => ({ ...prev, [item.id]: text }))}
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
//                 <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Confirm Sales</Text>
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
//                             onPress={handlePostSales}
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
//                                 Post Sales
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
import { Image, TouchableOpacity, ScrollView, View, StyleSheet, TextInput, Modal } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

export default function MainSales() {
    const [items, setItems] = useState([]);
    const [basket, setBasket] = useState({});
    const [prices, setPrice] = useState({});
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
            const response = await fetch(`http://192.168.100.45:8080/api/v1/model?email=${userEmail}`);
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
            alert("Please select at least one item to sell.");
            return;
        }

        const salesData = selectedItems.map(item => ({
            ...item,
            paymentMethod: selectedPaymentMethod,
            mobileNumber: selectedPaymentMethod === 'mpesa' ? mobileNumber : '',
        }));

        console.log("Sales Data:", JSON.stringify(salesData, null, 2));

        try {
            const userEmail = await AsyncStorage.getItem('userEmail');

            const response = await fetch(`http://192.168.100.45:8080/api/v1/sales/bulk?email=${userEmail}`, {
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
            toast.success('Sales posted successfully!'); // Use react-toastify
            
            setModalVisible(false);

            const totalPrice = calculateTotalPrice();
            navigation.navigate('Receipt', { salesData, totalPrice });

        } catch (error) {
            alert(`Error posting sales: ${error.message}`);
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
            <ToastContainer /> {/* Add the ToastContainer here */}
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
                                                placeholder="Sale Price"
                                                keyboardType="numeric"
                                                value={prices[item.id]}
                                                onChangeText={(text) => setPrice(prev => ({ ...prev, [item.id]: text }))} 
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
        marginBottom: 5,
    },
    quantity: {
        fontSize: 14,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    selectedPaymentMethod: {
        backgroundColor: '#d9d9d9',
    },
    methodText: {
        marginLeft: 10,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#006400',
    },
    closeButton: {
        marginTop: 10,
    },
});
