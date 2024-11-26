import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadImagePage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadResponse, setUploadResponse] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email);
    };
    fetchEmail();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      alert('Please select an image first');
      return;
    }
  
    setLoading(true);
    const fileExtension = imageUri.split('.').pop();
    const mimeType = `image/${fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'jpeg' : fileExtension}`;
  
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      type: mimeType,
      name: `avatar.${fileExtension}`,
    });
    
    // Add additional fields based on API requirements
    formData.append('email', userEmail); // Ensure 'email' is included if required
  
    try {
      const response = await axios.post(
        'https://gunners-7544551f4514.herokuapp.com/api/v1/model',
        formData // No 'Content-Type' header specified here
      );
      setUploadResponse('Upload Successful!');
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Error config:', error.config);
      if (error.response) {
        // More detailed error handling
        console.error('Response data:', error.response.data);
        setUploadResponse(`Upload Failed: ${error.response.data.message || error.message}`); // Use error message from response
      } else {
        setUploadResponse(`Upload Failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  


  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Upload Image" onPress={uploadImage} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {uploadResponse && <Text>{uploadResponse}</Text>}
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default UploadImagePage;
