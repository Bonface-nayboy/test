import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ route, navigation }) => {
  const { cartItems = [] } = route.params || {};
  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return;
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (index) => {
    setItems(prevItems =>
      prevItems.filter((item, i) => i !== index)
    );
  };

  const handleCheckout = () => {
    Alert.alert('Proceeding to checkout');
    // Clear items from the cart after checkout
    setItems([]);  // Clear the cart items
    navigation.navigate('Items'); // Navigate to the home or previous screen
  };

  const renderItem = ({ item, index }) => (
    <View style={{ marginBottom: 20, backgroundColor: 'white', marginLeft: 0 }}>
      <Card style={{ borderRadius: 10, backgroundColor: 'white', width: 310, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2, marginLeft: 0, padding: 0 }}>
        <Card.Content style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
          ) : (
            <View style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: '#ddd' }} />
          )}
          <View style={{ flex: 1, marginLeft: 15 }}>
          <View style={{ flexDirection:'row',alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <View style={{ position: 'relative' }}>
                                            <Button style={{ padding: 0 }}>
                                                <View style={{
                                                    width: 45, // Set a fixed width
                                                    height: 25, // Set a fixed height
                                                    borderRadius: 15, // Ensure it is circular
                                                    backgroundColor: 'red',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'absolute', // Absolute positioning if necessary
                                                    top: -20, // Adjust this value to position the circle
                                                    right: -10 // Adjust this value to position the circle
                                                }}>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        lineHeight: 12,
                                                    }}>
                                                        {item.stock}
                                                    </Text>
                                                </View>
                                            </Button>
                                        </View>
                                        </View>

                                        {/* <Text style={{ fontSize: 14, color: 'black',marginLeft:130 }}>stock👆</Text> */}
            <Text style={{ fontSize: 14, color: '#888' }}>{item.price}</Text>
           
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={() => updateQuantity(index, item.quantity - 1)} disabled={item.quantity <= 1} style={{ backgroundColor: 'green', height: 25, width: 25, borderRadius: 12.5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                <Icon name="minus" size={15} color="white" />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', marginHorizontal: 10 }}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(index, item.quantity + 1)} style={{ backgroundColor: 'green', height: 25, width: 25, borderRadius: 12.5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                <Icon name="plus" size={15} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeItem(index)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
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
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 18, color: '#888', marginTop: 50 }}>Your cart is empty</Text>}
        />
      ) : (
        <Text style={{ textAlign: 'center', fontSize: 18, color: '#888', marginTop: 50 }}>Your cart is empty</Text>
      )}
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={handleCheckout} style={{ backgroundColor: '#006400', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
