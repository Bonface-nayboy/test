import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function CoolScreen() {
    const navigation = useNavigation();
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Items'); 
        }, 5000); 

        // Start the animation
        Animated.timing(animatedValue, {
            toValue: 1, // Animate to full size
            duration: 5000, // Duration of the animation
            useNativeDriver: false // Use the native driver for better performance
        }).start();

        return () => clearTimeout(timer);
    }, [navigation, animatedValue]);

    const interpolatedSize = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 355],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome To The Party!</Text>
            <Card style={styles.card}>
                <Animated.Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQaB3HvhaEfoC3RhvZHnCh2iizz1wnoL13pg&s' }}
                    style={{
                        height: interpolatedSize,
                        width: interpolatedSize,
                        borderRadius: 200,
                    }}
                />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        marginBottom:20
    }
});
