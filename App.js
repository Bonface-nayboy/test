import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import HomeScreen from './components/home/homescreen';
import Favourites from './components/others/favourites';
import ItemDetail from './components/others/staticitems';
import CartScreen from './components/others/CartScreen';
import Register from './components/home/login/register';
import Login from './components/home/login/login';
import MainScreen from './screens/MainScreen';
import ResetPassword from './components/home/login/resetpassword';
// import Toast from 'react-native-toast-message';
import Newcode from './components/home/login/Code';
import Newpass from './components/home/login/newpassword';
import Gunners from './components/home/login/Gunners';
import Homepage from './screens/homepage';
import Mainmenu from './components/others/menu';
import { ThemeProvider } from './components/others/theme';
import Profile from './components/home/Profile';
import Products from './components/others/products';
import CreateProduct from './components/others/productsCreated';
import Items from './screens/Items';
import Sales from './screens/sales/sales';
import Purchases from './screens/purchases/purchases';
import Receipt from './screens/sales/Receipt';
import CoolScreen from './screens/coolscreen';
import MainSales from './screens/sales/mainSales';
import PurchaseReceipt from './screens/purchases/PurchaseReceipt';

// // Conditionally import CSS for web
// if (Platform.OS === 'web') {
//   require('react-toastify/dist/ReactToastify.css');
// }

const Stack = createNativeStackNavigator();

const RootScreen = ({ navigation }) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.whiteBackground} />
      <View style={styles.greenBackground} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gunners')}>
        <Text style={styles.buttonText}>GUNN<Text style={styles.redE}>E</Text>RS📌</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="Detail" component={ItemDetail} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Mainmenu" component={Mainmenu} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Code" component={Newcode} />
            <Stack.Screen name="newpassword" component={Newpass} />
            <Stack.Screen name="Gunners" component={Gunners} options={{ headerShown: false }} />
            <Stack.Screen name="homepage" component={Homepage} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="CreateProduct" component={CreateProduct} />
            <Stack.Screen name="Items" component={Items} options={{ headerShown: false }} />
            <Stack.Screen name='Sales' component={Sales} />
            <Stack.Screen name='MainSales' component={MainSales} />
            <Stack.Screen name='Purchases' component={Purchases} />
            <Stack.Screen name="Receipt" component={Receipt} />
            <Stack.Screen name='PurchaseReceipt' component={PurchaseReceipt} />
            <Stack.Screen name='CoolScreen' component={CoolScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
          {/* <Toast /> */}
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  whiteBackground: {
    flex: 0,
    backgroundColor: 'white',
  },
  greenBackground: {
    flex: 1,
    backgroundColor: '#90EE90',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  redE: {
    color: 'green',
  },
});
