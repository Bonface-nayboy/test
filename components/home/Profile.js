import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Profile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Bonface9');
  const [email, setEmail] = useState('bonface@gmail.com');
  const [mobile, setMobile] = useState('+254-700000000');

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const categories = [
    {
      title: '🍞 FOODS',
      items: ['Pizza', 'Cake']
    },
    {
      title: '☕ BEVERAGES',
      items: ['Gilbeys', 'Afia Drink']
    },
    {
      title: '🍞 FOODS',
      items: ['Pizza', 'Cake']
    },
    {
      title: '☕ BEVERAGES',
      items: ['Gilbeys', 'Afia Drink']
    }
  ];


  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600' }}
          style={styles.profileImage}
        />
        <Text style={styles.heading}>{username}</Text>
        <Text style={styles.heading1}>Nakuru, Kenya</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.heading2}>Mobile number</Text>
          <View style={styles.inputGroup}>
            <View style={styles.iconWrapper}>
              <Icon name='volume-control-phone' size={20} color='green' />
            </View>
            <TextInput
              placeholder="Enter phone number"
              placeholderTextColor='#aaa'
              value={mobile}
              style={styles.textInput}
              onChangeText={setMobile}
            />
          </View>
          <Text style={styles.heading2}>Username</Text>
          <View style={styles.inputGroup}>
            <View style={styles.iconWrapper}>
              <Icon name='user-o' size={20} color='green' />
            </View>
            <TextInput
              placeholder="Enter username"
              placeholderTextColor='#aaa'
              value={username}
              style={styles.textInput}
              onChangeText={setUsername}
            />
          </View>
          <Text style={styles.heading2}>Email</Text>
          <View style={styles.inputGroup}>
            <View style={styles.iconWrapper}>
              <Icon name='envelope-o' size={20} color='green' />
            </View>
            <TextInput
              placeholder="Enter email address"
              placeholderTextColor='#aaa'
              value={email}
              style={styles.textInput}
              onChangeText={setEmail}
            />
          </View>
        </View>
      </View>
      <View style={{
        marginLeft: 0
      }} >
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }} >Most Ordered</Text>


<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 0 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20 }}>
            {categories.map((category, index) => (
              <View key={index} style={{ marginHorizontal: 5 }}>
                <Card style={{
                  width: 180,
                  height: 80,
                  backgroundColor: '#006400',
                  borderRadius: 10,
                  elevation: 3,
                }}>
                  <View style={{ alignItems: 'center', padding: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{category.title}</Text>
                    {/* <Text style={{ color: 'white', fontSize: 14 }}>Available</Text> */}
                    {category.items.map((item, idx) => (
                      <Text key={idx} style={{ color: 'white', fontSize: 14 }}>{item}</Text>
                    ))}
                  </View>
                </Card>
              </View>
            ))}
          </View>
        </ScrollView>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading1: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  heading2: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 45,
    marginLeft: 40,
    paddingHorizontal: 10,
    paddingLeft: 40, // Make space for the icon
    color: 'black',
  },
  iconWrapper: {
    position: 'absolute',
    left: 10,
  },
});

export default Profile;
