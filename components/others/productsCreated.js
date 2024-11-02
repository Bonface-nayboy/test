import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const CreateProduct = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async () => {
    // Retrieve the user email from AsyncStorage
    const userEmail = await AsyncStorage.getItem('userEmail');
    
    console.log('User Email fetched from storage:', userEmail);
    if (!userEmail || !productId || !productName || !productPrice || !productImage || !buyPrice || !category || !stock) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const newProduct = {
      productId,
      product_name: productName,
      product_price: productPrice,
      product_image: productImage,
      buyPrice: parseFloat(buyPrice),
      category,
      stock: parseInt(stock, 10),
    };

    try {
      const response = await fetch(`http://192.168.100.45:8080/api/v1/model?email=${encodeURIComponent(userEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([newProduct]), // Send as an array
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Product created successfully:', result);
      Alert.alert('Product created successfully!');

      // Clear form fields after submission
      setProductId('');
      setProductName('');
      setProductPrice('');
      setProductImage('');
      setBuyPrice('');
      setCategory('');
      setStock('');
    } catch (error) {
      console.error('Error creating product:', error);
      Alert.alert('Error creating product:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Id"
        value={productId}
        onChangeText={setProductId}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sale Price"
        value={productPrice}
        keyboardType="numeric"
        onChangeText={setProductPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Image URL"
        value={productImage}
        onChangeText={setProductImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Buy Price"
        value={buyPrice}
        keyboardType="numeric"
        onChangeText={setBuyPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        keyboardType="numeric"
        onChangeText={setStock}
      />
      <Button title="Create Product" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateProduct;
