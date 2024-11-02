import React, { useState, useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native"; 

const { width } = Dimensions.get("window");

const Images = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrQZsGfjNuunUqEPlbvD90bEoNftMxFGeOw&s',
            name: 'Iphone 10'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKK4mhiDOPcglG4thgc5bhTiOJLi9JOxknRA&s',
            name: 'Iphone 14'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc4D8uA5q38No8cDERNzD9W8T_HhyVD-fFQw&s',
            name: 'Iphone 15'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTws07jp-YVpWsJVLAU3KsEF50nCGtvZLtg&s',
            name: 'Iphone 10Pro'
        },

        

        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrQZsGfjNuunUqEPlbvD90bEoNftMxFGeOw&s',
            name: 'Iphone 10'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKK4mhiDOPcglG4thgc5bhTiOJLi9JOxknRA&s',
            name: 'Iphone 14'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc4D8uA5q38No8cDERNzD9W8T_HhyVD-fFQw&s',
            name: 'Iphone 15'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNFqncVlZe9584IpzbrUmgOIzJB8qjfQJag&s',
            name: 'Yorhurt'
        },  
    ];
    const translateX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(translateX, {
                toValue: width,
                duration: 5000,
                useNativeDriver: true,
            }).start(() => {
                translateX.setValue(-width);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            });
        }, 4500);

        return () => clearInterval(interval);
    }, [translateX, images.length]);

    return (
        <View style={styles.container}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Text key={`star-${index}`} style={styles.starDecoration}>★</Text>
            ))}
            {Array.from({ length: 5 }).map((_, index) => (
                <Text key={`flower-${index}`} style={styles.flowerDecoration}>🌸</Text>
            ))}

            <Animated.Image
                source={{ uri: images[currentIndex].uri }}
                style={[
                    styles.image,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            />
            <Animated.Text style={[styles.imageName, { transform: [{ translateX }] }]}>
                {images[currentIndex].name}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '112%',
        height: '70%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#006400",
        paddingVertical: 10,
    },
    image: {
        width: 120,
        height: 100,
        resizeMode: "cover",
        position: "absolute",
    },
    imageName: {
        position: "absolute",
        top: "80%",
        fontSize: 25,
        color: "white",
    },
    starDecoration: {
        position: "absolute",
        fontSize: 24,
        color: "white",
        top: Math.random() * 90 + "%",
        left: Math.random() * 100 + "%",
    },
    flowerDecoration: {
        position: "absolute",
        fontSize: 24,
        color: "pink",
        top: Math.random() * 10 + "%",
        left: Math.random() * 150 + "%",
    },
});

export default Images;
