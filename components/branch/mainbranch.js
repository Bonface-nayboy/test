import { purple } from '@mui/material/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Card, Text, Button, Checkbox } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Mainbranch() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [county, setCounty] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const isFormValid =
    businessName.trim() &&
    businessType &&
    county.trim() &&
    termsAccepted;

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const response = await fetch('http://192.168.100.45:8080/api/v1/mainbranch/single', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ businessName, businessType, county, referralCode, termsAccepted }),
        });

        const responseText = await response.text();



        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }


        if (responseText.startsWith("Main branch registered successfully")) {


          await AsyncStorage.setItem('BranchCredentials', JSON.stringify({ businessName, businessType, county, referralCode, termsAccepted }));


          setBusinessName('');
          setBusinessType('');
          setCounty('');
          setReferralCode('');
          setTermsAccepted(false);


          Toast.show({
            type: 'info',
            text1: 'Form Submitted',
            text2: responseText
          });

          navigation.navigate("Register");
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {

        Toast.show({
          type: 'error',
          text1: 'Failed to create a branch!',
          text2: 'Poor connection, please try again.'
        });
      }
    }
  };


  const businessTypes = [
    { label: 'Wholesale & Retail Shop', value: 'Shop', icon: 'store' },
    { label: 'Books & Gifts Shop', value: 'Books', icon: 'book' },
    { label: 'Grocery Store', value: 'Grocery', icon: 'basket' },
    { label: 'Butchery', value: 'Butchery', icon: 'food' },
    { label: 'Electricals & Electronics', value: 'Electricals', icon: 'lightbulb' },
    { label: 'Salon, Kinyozi & Beauty Parlour', value: 'Salon', icon: 'scissors-cutting' },
    { label: 'Shoes, Bags, Clothings & Fashion', value: 'Clothings', icon: 'shoe-formal' },
    { label: 'Babies, Kids & Toys', value: 'Toys', icon: 'toy-brick' },
    { label: 'Beauty & Cosmetics', value: 'Cosmetics', icon: 'lipstick' },
    { label: 'Furniture & Appliances', value: 'Furniture', icon: 'sofa' },
    { label: 'Phones, Tablets & Accessories', value: 'Phones', icon: 'cellphone' },
    { label: 'Garage, Carwash & Auto Spare', value: 'Garage', icon: 'car-wash' },
    { label: 'Laptops, Computers & Accessories', value: 'Laptops', icon: 'laptop' },
    { label: 'Construction, Tools & Hardware', value: 'Hardware', icon: 'hammer' },
    { label: 'Wines, Spirits & Alcoholic Products', value: 'Alcohol', icon: 'glass-wine' },
    { label: 'Pharmacy & Chemist', value: 'Chemist', icon: 'ambulance' },
    { label: 'Curtains, Beddings & Kitchenware', value: 'Curtains', icon: 'curtains' },
    { label: 'Others', value: 'Others', icon: 'dots-horizontal' },
  ];

  const renderItem = ({ item, index }) => {
    let iconColor = '#000';

    if (index < 3) {
      iconColor = 'purple';
    }
    else if (index >= 5 && index < 7) {
      iconColor = 'blue';
    }
    else if (index === 3) {
      iconColor = 'red';
    }
    else if (index === 4) {
      iconColor = 'gold';
    }
    else if (index >= 7 && index < 11) {
      iconColor = 'green';
    }
    else if (index === 11) {
      iconColor = 'orange';
    } else if (index === 12) {
      iconColor = '#FF8C00';
    } else if (index === 13) {
      iconColor = '#1158a2';
    } else if (index === 14) {
      iconColor = 'gold';
    }
    else if (index === 15) {
      iconColor = 'red';
    }
    else if (index === 16) {
      iconColor = '#2196f3';
    }


    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          setBusinessType(item.value);
          setModalVisible(false);
        }}
      >
        <Icon name={item.icon} size={24} color={iconColor} />
        <Text style={styles.listItemText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tell us about your business</Text>
      <Card style={styles.card}>
        <Text style={styles.label}>Business Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your business name"
          value={businessName}
          onChangeText={setBusinessName}
        />

        <Text style={styles.label}>Business Type</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setModalVisible(true)}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 0,
            paddingHorizontal: 15,
            borderWidth: 0,
            borderColor: 'gray',
            borderRadius: 5,
          }}>
            <Text style={[styles.pickerButtonText, { flex: 1 }]}>
              {businessType ? businessTypes.find(item => item.value === businessType).label : 'Select Business Type'}
            </Text>

            <Icon name="chevron-down" color="purple" size={24} />
          </View>
        </TouchableOpacity>

        {/* Modal for business type selection */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={businessTypes}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
              />
            </View>
          </View>
        </Modal>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value="Kenya"
          editable={false}
        />
        <Text style={styles.label}>County</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your county"
          value={county}
          onChangeText={setCounty}
        />

        <Text style={styles.label}>Referral Code (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter referral code"
          value={referralCode}
          onChangeText={setReferralCode}
        />

        <View style={styles.termsContainer}>
          <Checkbox
            status={termsAccepted ? 'checked' : 'unchecked'}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />
          <Text style={styles.termsText}>
            I agree to Rees{' '}
            <Text style={styles.link}>terms & conditions</Text>
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!isFormValid}
          style={[styles.continueButton, !isFormValid && styles.disabledButton]}
          labelStyle={styles.buttonText}
        >
          Continue
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  label: {
    color: 'black',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    color: "black"
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#a0a0a0',
    fontWeight: 'bold'
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  termsText: {
    fontSize: 12,
    marginLeft: 8,
  },
  link: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  continueButton: {
    marginTop: 24,
    backgroundColor: 'darkgreen',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
