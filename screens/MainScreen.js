import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import Images from '../components/others/MyImage';
import StaticImages from '../components/others/staticImages';
import Footer from '../components/others/footer';
import Items from '../components/others/menu';
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from 'react-native';



const MainScreen = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [username, setUsername] = useState('Bonface')
    const [iconColor, setIconColor] = useState('white'); 
    const handleIconPress = () => {
        setIconColor(iconColor === 'white' ? 'green' : 'white');
    };

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
                <Appbar.Content title={`${username} 😊`} titleStyle={styles.title} />
                {/* <Appbar.Action icon="home" onPress={handleHomeButtonPress} color="white" /> */}
                {/* <Appbar.Action
                    icon={() => <Icon name="user" size={30} color="white" />}
                    onPress={() => navigation.navigate('Login')}
                    style={styles.icon}
                /> */}
                <Appbar.Action icon="magnify" onPress={handleHomeButtonPress} color="green" style={styles.icon} />
                {/* <Appbar.Action
                    icon="cart"
                    onPress={handleCartButtonPress}
                    color="white"
                    style={styles.icon}
                >
                    {cartItems.length ? <Text style={styles.badge}>{cartItems.length}</Text> : null}
                </Appbar.Action>
                <Appbar.Action icon="bell" onPress={handleFavouritesbtttn} color="white" style={styles.icon} />
               

                <Items navigation={navigation} /> */}
                <Appbar.Action icon="menu" onPress={handleHomeButtonPress} color="black" style={styles.icon} />
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
            {/* <Footer /> */}
            <View style={{
                flexDirection: 'row',
                margin: 10
            }} >
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => {
                            handleIconPress();             
                            navigation.navigate('Home');  
                        }}  >
                        <Icon
                            name='home'
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer1}>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Icon
                            name='heart'
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer1}>
                    <TouchableOpacity  onPress={() => {
                            handleIconPress();             
                            navigation.navigate('homepage');  
                        }}  
                        >
                        <Icon
                            name='shopping-cart'
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer1}>
                    <TouchableOpacity
                        onPress={() => {
                            handleIconPress();             
                            navigation.navigate('Login');  
                        }}                    >
                        <Icon name="user" size={30} color="white" style={styles.icon} />
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%'
    },
    icon: {
        paddingHorizontal: 4,
        marginHorizontal: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 30,
        marginLeft: 10
    },
    iconContainer1: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 30,
        marginLeft: 50
    },

    header: {
        // backgroundColor: 'white',
        backgroundColor: 'white',

    },
    title: {
        color: "black",
        fontSize: 12
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 0,
        marginBottom: 300,
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
        backgroundColor: 'white',
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
