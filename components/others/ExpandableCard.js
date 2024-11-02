import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const ExpandableCard = ({ item, itemImage }) => {
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    const toggleExpand = () => {
        setExpanded(!expanded);
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    const cardHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 250], // Adjust based on your needs
    });

    const cardOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8], // Adjust opacity as desired
    });

    return (
        <Card style={[styles.card, { height: cardHeight, opacity: cardOpacity }]}>
            <TouchableOpacity onPress={toggleExpand}>
                <View style={styles.cardContent}>
                    <Image source={{ uri: itemImage }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                        {expanded && (
                            <View style={styles.details}>
                                <Text style={styles.description}>Detailed description of {item.name}.</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button}>
                                        <Icon name='cart-plus' size={24} color='green' />
                                        <Text style={styles.buttonText}>Add to Cart</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Icon name='heart' size={24} color='red' />
                                        <Text style={styles.buttonText}>Favorite</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 180,
        backgroundColor: '#006400',
        borderRadius: 15,
        margin: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 120,
        height: 110,
        borderRadius: 10,
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        color: 'white',
        fontSize: 14,
    },
    details: {
        marginTop: 10,
    },
    description: {
        color: 'white',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    buttonText: {
        color: 'white',
        marginLeft: 5,
    },
});

export default ExpandableCard;
