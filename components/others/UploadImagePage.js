import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const UploadImagePage = () => {
    const [imageUri, setImageUri] = useState(null);

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else {
                const source = { uri: response.assets[0].uri };
                setImageUri(source.uri);
            }
        });
    };

    const uploadImage = async () => {
        if (!imageUri) {
            Alert.alert('No image selected', 'Please select an image before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            type: 'image/jpeg', // Adjust the MIME type if necessary
            name: 'photo.jpg',
        });

        try {
            await axios.post('http://your-server-address/api/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', 'Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload failed', 'There was an error uploading the image.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Image</Text>
            <Button title="Select Image" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Button title="Upload Image" onPress={uploadImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        margin: 20,
    },
});

export default UploadImagePage;
