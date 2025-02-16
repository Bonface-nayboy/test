import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateProduct = () => {
  const navigation = useNavigation();
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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
    setLoading(true);
    try {
      const response = await fetch(`https://backend-rees-realme.onrender.com/api/v1/model?email=${encodeURIComponent(userEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([newProduct]),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Product created successfully:', result);
      Alert.alert('Product created successfully!');

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
    } finally {
      setLoading(false);
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
      <View style={styles.buttonContainer}>
        <Button 
          title="Upload Image" 
          onPress={() => navigation.navigate("UploadImagePage")} 
          color="black" 
          style={{
            backgroundColor:"white"
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? "Creating..." : "Create Product"} 
          onPress={handleSubmit} 
          disabled={loading} 
          color="#6200EE" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 5, // Adds space between the buttons
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
