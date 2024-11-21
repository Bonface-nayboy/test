import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import moment from 'moment';
import * as Print from 'expo-print';
import { useNavigation } from '@react-navigation/native';

const PurchaseReceipt = ({ route }) => {
    const { purchaseData, totalPrice } = route.params;
    const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.productName}</Text>
                <Text style={styles.itemQuantity}>{item.quantity} x </Text>
            </View>
            <Text style={styles.itemPrice}>Ksh {parseFloat(item.buyPrice).toFixed(2)}</Text>
        </View>
    );

    const handlePrint = async () => {
        try {
            const htmlContent = renderReceiptToHtml();

            // Print the HTML content as a PDF
            await Print.printAsync({
                html: htmlContent,
            });
        } catch (error) {
            console.error('Printing error:', error);
        }
        navigation.navigate('Items');
    };

    const renderReceiptToHtml = () => {
        const itemsHtml = purchaseData.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>${item.productName}</span>
                <span>x ${item.quantity}</span>
                <span>Ksh ${parseFloat(item.buyPrice).toFixed(2)}</span>
            </div>
        `).join('');

        return `
            <html>
                <head>
                    <title>Purchase Receipt</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { text-align: center; }
                        .total { font-weight: bold; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <h1>Gunner's Supermarket</h1>
                    <p>Thank you for your purchase!</p>
                    <p>${currentDate}</p>
                    <hr/>
                    <div>${itemsHtml}</div>
                    <hr/>
                    <div class="total">Total: Ksh ${parseFloat(totalPrice).toFixed(2)}</div>
                    <p>Visit us again!</p>
                </body>
            </html>
        `;
    };

    const formattedTotalPrice = typeof totalPrice === 'string' ? totalPrice : totalPrice.toFixed(2);

    return (
        <View style={styles.container}>
            <Card style={styles.card}> 
                <Text style={styles.headerText}>Gunner's Supermarket </Text>
                <Text style={styles.subHeaderText}>Thank you for your purchase!</Text>
                <Text style={styles.dateText}>{currentDate}</Text>
                <View style={styles.separator} />
                <FlatList
                    data={purchaseData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.separator} />
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalPrice}>Ksh {formattedTotalPrice}</Text>
                </View>
                <View style={styles.separator} />
                <Text style={styles.footerText}>Visit us again!</Text>
                <TouchableOpacity onPress={handlePrint} style={styles.button}>
                    <Text style={styles.buttonText}>Print</Text>
                </TouchableOpacity>
                <Button mode='outlined' onPress={()=>navigation.navigate('Items') }
                 style={{color:"purple", marginTop: 10,paddingVertical: 2, borderRadius: 25,alignItems: 'center',marginBottom: 10,width: 100,
        marginLeft: 100}}>Home</Button>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'white',
        width:320,
        marginLeft:0
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#333',
    },
    subHeaderText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#555',
    },
    dateText: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
        color: '#777',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
    },
    itemContainer: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right',
        color: '#333',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    footerText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#006400',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 10,
        width: 200,
        marginLeft: 60
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PurchaseReceipt;
