import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadImagePage from './UploadImagePage';

const Favourites = () => {
    const header = ['Item Name', 'Buy Price', 'Sale Price', 'Actions'];
    const data = [
        { name: 'Fanta', buyPrice: '1.00', salePrice: '1.50' },
        { name: 'Coke', buyPrice: '1.20', salePrice: '1.80' },
        { name: 'Cake', buyPrice: '1.00', salePrice: '1.50' },
        { name: 'Biscuit', buyPrice: '1.20', salePrice: '1.80' },
        { name: 'Banana', buyPrice: '1.00', salePrice: '1.50' },
        { name: 'Orange', buyPrice: '1.20', salePrice: '1.80' },
        { name: 'Mango', buyPrice: '1.00', salePrice: '1.50' },
        { name: 'Crisps', buyPrice: '1.20', salePrice: '1.80' },
        { name: 'Mandazi', buyPrice: '1.00', salePrice: '1.50' },
        { name: 'Bread', buyPrice: '1.20', salePrice: '1.80' },
        { name: 'Royco', buyPrice: '1.00', salePrice: '1.50' },
        { name: 'Butter', buyPrice: '1.20', salePrice: '1.80' },
    ];

    const [likes, setLikes] = useState(data.map(() => false));
    const [animations, setAnimations] = useState(data.map(() => new Animated.Value(0)));

    const handleEdit = (item) => {
        Alert.alert(
            "Confirm Edit",
            `Are you sure you want to edit ${item.name}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => console.log('Edit item:', item)
                }
            ]
        );
    };

    const handleDelete = (item) => {
        Alert.alert(
            "Confirm Delete",
            `Are you sure you want to delete ${item.name}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => console.log('Delete item:', item)
                }
            ]
        );
    };

    const handleLike = (index) => {
        const updatedLikes = [...likes];
        updatedLikes[index] = !updatedLikes[index];
        setLikes(updatedLikes);

        if (updatedLikes[index]) {
            Animated.sequence([
                Animated.timing(animations[index], { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.timing(animations[index], { toValue: 0, duration: 300, useNativeDriver: true })
            ]).start();
        }
    };

    const renderRow = (row, index) => (
        <View style={styles.row} key={row.name}>
            <Text style={styles.cell}>{row.name}</Text>
            <Text style={styles.cell}>{row.buyPrice}</Text>
            <Text style={styles.cell}>{row.salePrice}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(row)}>
                    <MaterialCommunityIcons name="pencil" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(row)}>
                    <MaterialCommunityIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLike(index)}>
                    <Animated.View style={{ transform: [{ scale: animations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.5]
                    }) }] }}>
                        <MaterialCommunityIcons 
                            name="heart" 
                            size={24} 
                            color={likes[index] ? 'red' : 'purple'} 
                        />
                    </Animated.View>
                    {likes[index] && <Text style={styles.likeText}>Like</Text>}
                </TouchableOpacity>
            </View>
          
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Items</Text>
            <View style={styles.table}>
                <View style={styles.headerRow}>
                    {header.map((col, index) => (
                        <Text key={index} style={styles.headerText}>{col}</Text>
                    ))}
                </View>
                {data.map((item, index) => renderRow(item, index))}
            </View>
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'white',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 16,
    },
    table: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingVertical: 8,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 8,
        borderRadius: 4,
        margin: 4,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    likeText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default Favourites;
