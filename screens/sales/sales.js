
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, Modal, TextInput, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';

const Sales = ({ route, navigation }) => {
  const { basketItems = [] } = route.params || {};
  const [items, setItems] = useState(basketItems);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isPostEnabled, setIsPostEnabled] = useState(false);

  useEffect(() => {
    setItems(basketItems);
  }, [basketItems]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (index) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK", onPress: () => {
            setItems(prevItems =>
              prevItems.filter((_, i) => i !== index)
            );
          }
        }
      ]
    );
  };

  const paymentMethods = [
    { id: 'cash', name: 'Cash 💰', icon: 'money' },
    { id: 'mpesa', name: 'Mpesa 📲', icon: 'mobile' },
    { id: 'cheque', name: 'Cheque ✅', icon: 'check' },
  ];

  useEffect(() => {
    setIsPostEnabled(selectedPaymentMethod === 'cash' || (selectedPaymentMethod === 'mpesa' && mobileNumber.length === 10));
  }, [selectedPaymentMethod, mobileNumber]);

  const handlePostSales = async () => {
    if (items.length === 0) {
      alert('No items to post!');
      return;
    }

    const salesData = items.map(item => ({
      productId: item.productId || item.id,
      productName: item.productName || item.name || '',
      quantity: parseInt(item.quantity, 10) || 0,
      price: parseFloat(item.price) || 0, // Ensure price is a number
    }));

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

  // If successful
  const result = await response.json();
  console.log('Fetched items:', result);
  Toast.show({
    type: 'success',
    text1: 'Sales posted successfully!',
  });
  setModalVisible(false);
  const totalPrice = calculateTotalPrice(); 

  navigation.navigate('Receipt', { salesData, totalPrice });
  console.log('salesdata :', salesData);

} catch (error) {
  alert(`Error posting sales: ${error.message}`);
  console.error('error posting sale',error)
}

  };

  
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  const renderItem = ({ item, index }) => (
    <View style={{ marginBottom: 20, backgroundColor: 'white', marginLeft: 0 }}>
      <Card style={{ borderRadius: 10, backgroundColor: 'white', width: 310, elevation: 3 }}>
        <Card.Content style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
          ) : (
            <View style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: '#ddd' }} />
          )}
          <View style={{ flex: 1, marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
              <View style={{ position: 'relative' }}>
                <View style={{
                  width: 45,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -20,
                  right: -10,
                }}>
                  <Text style={{ fontSize: 12, color: 'white', textAlign: 'center', lineHeight: 12 }}>
                    {item.stock}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ fontSize: 18, color: 'green' }}>Ksh {item.price}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={() => updateQuantity(index, item.quantity - 1)} disabled={item.quantity <= 1} style={{ backgroundColor: 'green', height: 25, width: 25, borderRadius: 12.5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                <Icon name="minus" size={15} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 10 }}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(index, item.quantity + 1)} style={{ backgroundColor: 'green', height: 25, width: 25, borderRadius: 12.5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                <Icon name="plus" size={15} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeItem(index)} style={{ marginLeft: 20 }}>
                <Icon name='trash' style={{ fontSize: 13, color: 'grey' }} />
                <Text style={{ fontSize: 12, color: 'green', marginHorizontal: 10 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ paddingVertical: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: Ksh {calculateTotalPrice()}</Text>
          </View>
        </>
      ) : (
        <Text style={{ textAlign: 'center', fontSize: 18, color: '#888', marginTop: 50 }}>Your Sales is empty</Text>
      )}
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#006400', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Confirm Sales</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedPaymentMethod(method.id)}
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === method.id ? styles.selectedPaymentMethod : null,
                ]}
              >
                <Icon name={method.icon} size={20} color="#000" style={{ marginRight: 10 }} />
                <Text style={styles.methodText}>{method.name}</Text>
              </TouchableOpacity>
            ))}

            {selectedPaymentMethod === 'mpesa' && (
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="numeric"
              />
            )}

            <View style={styles.buttonContainer}>
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
                    marginTop: 0,
                  },
                ]}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Post Sales</Text>
              </Button>

              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  selectedPaymentMethod: {
    backgroundColor: '#3CB371',
  },
  methodText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 0,
    justifyContent: 'space-around',
  },
  submitButton: {
    marginTop: 0,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default Sales;
