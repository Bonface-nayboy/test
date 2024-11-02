    import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Modal, View, Image, TouchableOpacity, Button, Text, Alert } from "react-native";
import { RadioButton } from "react-native-paper";

const StaticImages = ({ page, itemsPerPage }) => {
    const allImages = [
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrQZsGfjNuunUqEPlbvD90bEoNftMxFGeOw&s', name: 'Iphone 10', price: '$999', colors: { Red: 'https://link_to_red_image', Blue: 'https://link_to_blue_image', Black: 'https://link_to_black_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKK4mhiDOPcglG4thgc5bhTiOJLi9JOxknRA&s', name: 'Iphone 14', price: '$1099', colors: { White: 'https://link_to_white_image', Green: 'https://link_to_green_image', Silver: 'https://link_to_silver_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc4D8uA5q38No8cDERNzD9W8T_HhyVD-fFQw&s', name: 'Iphone 15', price: '$1199', colors: { Black: 'https://link_to_black_image', Pink: 'https://link_to_pink_image', Purple: 'https://link_to_purple_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTws07jp-YVpWsJVLAU3KsEF50nCGtvZLtg&s', name: 'Iphone 10Pro', price: '$1299', colors: { Red: 'https://link_to_red_image', Blue: 'https://link_to_blue_image', Black: 'https://link_to_black_image' }},

        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNFqncVlZe9584IpzbrUmgOIzJB8qjfQJag&s', name: 'Iphone 10', price: '$999', colors: { Red: 'https://link_to_red_image', Blue: 'https://link_to_blue_image', Black: 'https://link_to_black_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNRw4LJPgPg8ZCu7wDuj9BG5h0yhy_ZCQhQ&s', name: 'Iphone 14', price: '$1099', colors: { White: 'https://link_to_white_image', Green: 'https://link_to_green_image', Silver: 'https://link_to_silver_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR66Ka7buHw-0QVr0rZ09aHXwh1ZOsIW-WmcA&s', name: 'Iphone 15', price: '$1199', colors: { Black: 'https://link_to_black_image', Pink: 'https://link_to_pink_image', Purple: 'https://link_to_purple_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHkCJh1dH3UWfwx5NXXz_JXu_Hdl54IPijQ&s', name: 'Iphone 10Pro', price: '$1299', colors: { Red: 'https://link_to_red_image', Blue: 'https://link_to_blue_image', Black: 'https://link_to_black_image' }},
        
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzapL2Ml1-AnGmxff_X0DZrXo5xY0cHPmTg&s', name: 'Iphone 10', price: '$999', colors: { Red: 'https://link_to_red_image', Blue: 'https://link_to_blue_image', Black: 'https://link_to_black_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtAER8TZsj5OcEIltyRY7omFXQ54Z6lvELw&s', name: 'Iphone 14', price: '$1099', colors: { White: 'https://link_to_white_image', Green: 'https://link_to_green_image', Silver: 'https://link_to_silver_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9g1e5YVB8GVwnHRW-bTc3N63vjsuTUtA2ug&s', name: 'Iphone 15', price: '$1199', colors: { Black: 'https://link_to_black_image', Pink: 'https://link_to_pink_image', Purple: 'https://link_to_purple_image' } },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8bD8kZ9N1QdXuHUc2ZAHNu8NhqOx1VyBNg&s', name: 'Iphone 10Pro', price: '$1299', colors: { Red: 'https://link_to_red_image', Blue: 'https://link_to_blue_image', Black: 'https://link_to_black_image' }},
        
        
    ];

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');

    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    const onImagePress = (item) => {
        setSelectedItem(item);
        const firstColor = Object.keys(item.colors)[0];
        setSelectedColor(firstColor);
        toggleModalVisibility();
    };

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedImages = allImages.slice(startIndex, startIndex + itemsPerPage);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.gridContainer}>
                {paginatedImages.map((image, index) => (
                    <View style={styles.gridItem} key={index}>
                        <TouchableOpacity onPress={() => onImagePress(image)}>
                            <Image
                                source={{ uri: image.uri }}
                                style={styles.gridImage}
                            />
                        </TouchableOpacity>
                        <Text style={styles.gridImageName}>{image.name}</Text>
                    </View>
                ))}
            </View>

            <Modal
                animationType="slide"
                transparent
                visible={isModalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}
            >
                <View style={styles.modalWrapper}>
                    <View style={styles.modalView}>
                        {selectedItem && (
                            <>
                                <Image
                                    source={{ uri: selectedItem.colors[selectedColor] }}
                                    style={styles.modalImage}
                                />
                                <Text style={styles.modalName}>{selectedItem.name}</Text>
                                <Text style={styles.modalPrice}>{selectedItem.price}</Text>
                                <Text>Colors:</Text>
                                <RadioButton.Group onValueChange={value => setSelectedColor(value)} value={selectedColor}>
                                    {Object.keys(selectedItem.colors).map(color => (
                                        <View key={color} style={styles.radioContainer}>
                                            <RadioButton value={color} />
                                            <Text>{color}</Text>
                                        </View>
                                    ))}
                                </RadioButton.Group>
                                <Button title="Add to Cart" onPress={() => Alert.alert('Added to cart!')} />
                                <Button title="Close" onPress={toggleModalVisibility} />
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0,
    },
    gridItem: {
        width: '45%',
        margin: 5,
        alignItems: 'center',
    },
    gridImage: {
        width: 150,
        height: 110,
        resizeMode: 'cover',
    },
    gridImageName: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    modalWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage: {
        width: 150,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    modalName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalPrice: {
        fontSize: 18,
        color: 'green',
        marginTop: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default StaticImages;


// import React, { useState, useEffect } from "react";
// import { SafeAreaView, StyleSheet, Modal, View, Image, TouchableOpacity, Button, Text, Alert } from "react-native";
// import { RadioButton } from "react-native-paper";
// import axios from 'axios';
// const StaticImages = ({ page, itemsPerPage }) => {
//     const [allImages, setAllImages] = useState([]);
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [selectedColor, setSelectedColor] = useState('');

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const response = await axios.get('http:// 192.168.100.23:3000/api/products'); 
//                 console.log('Fetched images:', response.data);
//                 setAllImages(response.data);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         };
        

//         fetchImages();
//     }, []);

//     const toggleModalVisibility = () => {
//         setModalVisible(!isModalVisible);
//     };

//     const onImagePress = (item) => {
//         console.log('Image pressed:', item);
//         setSelectedItem(item);
//         const firstColor = Object.keys(item.colors)[0];
//         setSelectedColor(firstColor);
//         toggleModalVisibility();
//     };

//     const startIndex = (page - 1) * itemsPerPage;
//     const paginatedImages = allImages.slice(startIndex, startIndex + itemsPerPage);

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.gridContainer}>
//                 {paginatedImages.map((image, index) => (
//                     <View style={styles.gridItem} key={index}>
//                         <TouchableOpacity onPress={() => onImagePress(image)}>
//                             <Image
//                                 source={{ uri: image.uri }}
//                                 style={styles.gridImage}
//                             />
//                         </TouchableOpacity>
//                         <Text style={styles.gridImageName}>{image.name}</Text>
//                     </View>
//                 ))}
//             </View>

//             <Modal
//                 animationType="slide"
//                 transparent
//                 visible={isModalVisible}
//                 presentationStyle="overFullScreen"
//                 onDismiss={toggleModalVisibility}
//             >
//                 <View style={styles.modalWrapper}>
//                     <View style={styles.modalView}>
//                         {selectedItem && (
//                             <>
//                                 <Image
//                                     source={{ uri: selectedItem.colors[selectedColor] }}
//                                     style={styles.modalImage}
//                                 />
//                                 <Text style={styles.modalName}>{selectedItem.name}</Text>
//                                 <Text style={styles.modalPrice}>{selectedItem.price}</Text>
//                                 <Text>Colors:</Text>
//                                 <RadioButton.Group onValueChange={value => setSelectedColor(value)} value={selectedColor}>
//                                     {Object.keys(selectedItem.colors).map(color => (
//                                         <View key={color} style={styles.radioContainer}>
//                                             <RadioButton value={color} />
//                                             <Text>{color}</Text>
//                                         </View>
//                                     ))}
//                                 </RadioButton.Group>
//                                 <Button title="Add to Cart" onPress={() => Alert.alert('Added to cart!')} />
//                                 <Button title="Close" onPress={toggleModalVisibility} />
//                             </>
//                         )}
//                     </View>
//                 </View>

//             </Modal>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginBottom: 10
//     },
//     gridContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginTop: 0,
//     },
//     gridItem: {
//         width: '45%',
//         margin: 5,
//         alignItems: 'center',
//     },
//     gridImage: {
//         width: 150,
//         height: 110,
//         resizeMode: 'cover',
//     },
//     gridImageName: {
//         marginTop: 1,
//         fontSize: 16,
//         color: '#333',
//         marginBottom: 10,
//     },
//     modalWrapper: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//     },
//     modalView: {
//         width: '80%',
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalImage: {
//         width: 150,
//         height: 110,
//         resizeMode: 'contain',
//         marginBottom: 10,
//     },
//     modalName: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     modalPrice: {
//         fontSize: 18,
//         color: 'green',
//         marginTop: 10,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
// });

// export default StaticImages;
