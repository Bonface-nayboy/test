
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const itemsPerPage = 4;
  const totalItems = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleHomeButtonPress = () => {
    navigation.navigate('Home');
  };

  const handleFavouritesbtttn = () => {
    navigation.navigate('Favourites');
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCartButtonPress = () => {
    navigation.navigate('Cart', { cartItems });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Gunners" titleStyle={styles.title} />
        <Appbar.Action icon="home" onPress={handleHomeButtonPress} color="white" />
        <Appbar.Action icon="magnify" onPress={handleHomeButtonPress} color="white" />

        <Appbar.Action
          icon="cart"
          onPress={handleCartButtonPress}
          color="white"
        >
          {cartItems.length ? <Text style={styles.badge}>{cartItems.length}</Text> : null}
        </Appbar.Action>
        <Appbar.Action icon="bell" onPress={handleFavouritesbtttn} color="white" />
        <Items navigation={navigation} />
      </Appbar.Header>

      <View style={styles.content}>
        <Images />
        <Text style={styles.text}>Gunners Company</Text>
        <StaticImages page={currentPage} itemsPerPage={itemsPerPage} />
      </View>

      <View style={styles.pagination}>
        <Button title="Previous" onPress={handlePreviousPage} disabled={currentPage === 1} />
        <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
        <Button title="Next" onPress={handleNextPage} disabled={currentPage === totalPages} />
      </View>

      <StatusBar style="auto" />
      <Footer />
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#002970',
    },
    title: {
      color: 'white',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 0,
      marginBottom: 280,
    },
    text: {
      fontSize: 18,
      color: '#333',
      marginVertical: 0,
      textAlign: 'center',
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: '#f1f1f1',
      marginBottom: 0,
    },
    pageText: {
      fontSize: 16,
      alignSelf: 'center',
    },
    badge: {
      position: 'absolute',
      right: 8,
      top: 4,
      backgroundColor: 'red',
      color: 'white',
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: 12,
    },
  });
  
  export default MainScreen;