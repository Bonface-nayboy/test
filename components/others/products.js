import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import CreateProduct from './productsCreated';
import Items from '../../screens/Items';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const response = await fetch('https://gunners-7544551f4514.herokuapp.com/api/v1/model');//http://192.168.100.45:8080/api/v1/model 10.0.2.2
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.productPrice}>{item.product_price}</Text>
                {item.product_image && (
                  <Image
                    source={{ uri: item.product_image }}
                    style={styles.productImage}
                  />
                )}
                <Text style={styles.productDescription}>{item.product_description}</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View>
                <Button
                  onPress={() => navigation.navigate(CreateProduct)}
                >
                  <Text>Add</Text>
                </Button>
                <Button
                  onPress={() => navigation.navigate(Items)}
                >
                  <Text>Home</Text>
                </Button>
              </View>
            )}
          />
        </View>
      );
      
};

const styles = StyleSheet.create({
    productContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: 'green',
    },
    productImage: {
        width: 100,
        height: 100,
        marginVertical: 5,
    },
    productDescription: {
        fontSize: 14,
        color: 'gray',
    },
});

export default Products;
