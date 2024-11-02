import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";

const ItemDetail = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.price}>Sale Price: {item.price}</Text>
            <Text style={styles.colorsTitle}>Available Colors:</Text>
            <View style={styles.colorsContainer}>
                {item.colors.map((color, index) => (
                    <View
                        key={index}
                        style={[styles.colorButton, { backgroundColor: color.toLowerCase() }]}
                    />
                ))}
            </View>
            <Button onPress={() => navigation.goBack()}>Go Back</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: '80%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    price: {
        fontSize: 18,
        marginBottom: 10,
    },
    colorsTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    colorsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
    },
});

export default ItemDetail;
