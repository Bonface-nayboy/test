import React, { Suspense, lazy } from 'react';
// import * as Updates from 'expo-updates';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from './components/home/homescreen';
import Favourites from './components/others/favourites';
import { ThemeProvider } from './components/others/theme';
import { BasketProvider } from './BasketContext';
import Toast from 'react-native-toast-message';
import UploadImagePage from './components/others/UploadImagePage';
import Mainbranch from './components/branch/mainbranch';
import SubBranch from './components/branch/sub-Branch';

// Lazy load screens
const ItemDetail = lazy(() => import('./components/others/staticitems'));
const CartScreen = lazy(() => import('./components/others/CartScreen'));
const Register = lazy(() => import('./components/home/login/register'));
const Login = lazy(() => import('./components/home/login/login'));
const ResetPassword = lazy(() => import('./components/home/login/resetpassword'));
const Newcode = lazy(() => import('./components/home/login/Code'));
const Newpass = lazy(() => import('./components/home/login/newpassword'));
const Gunners = lazy(() => import('./components/home/login/Gunners'));
const Mainmenu = lazy(() => import('./components/others/menu'));
const Profile = lazy(() => import('./components/home/Profile'));
const Products = lazy(() => import('./components/others/products'));
const CreateProduct = lazy(() => import('./components/others/productsCreated'));
const Items = lazy(() => import('./screens/Items'));
const Sales = lazy(() => import('./screens/sales/sales'));
const Purchases = lazy(() => import('./screens/purchases/purchases'));
const Receipt = lazy(() => import('./screens/sales/Receipt'));
const MainSales = lazy(() => import('./screens/sales/mainSales'));
const PurchaseReceipt = lazy(() => import('./screens/purchases/PurchaseReceipt'));
const Category = lazy(() => import('./components/others/category'));

const Stack = createNativeStackNavigator();

// const checkForUpdates = async () => {
//   try {
//     const update = await Updates.checkForUpdateAsync();
//     if (update.isAvailable) {
//       console.log("🔄 New update found! Fetching...");
//       await Updates.fetchUpdateAsync();
//       await Updates.reloadAsync();
//     } else {
//       console.log("✅ App is up to date!");
//     }
//   } catch (error) {
//     console.error("❌ Error checking for updates:", error);
//   }
// };

const RootScreen = ({ navigation }) => (
  <View style={styles.rootContainer}>
    <View style={styles.whiteBackground} />
    <View style={styles.greenBackground} />
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gunners')}>
      <Text style={styles.buttonText}>REES<Text style={styles.redE}> PoS</Text> APP</Text>
    </TouchableOpacity>
    {/* Update Button */}
    {/* <TouchableOpacity style={styles.updateButton} onPress={checkForUpdates}>
      <Text style={styles.updateButtonText}>Check for Updates</Text>
    </TouchableOpacity> */}
  </View>
);

const App = () => {
  return (
    <ThemeProvider>
      <PaperProvider>
        <BasketProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Root">
              <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Favourites" component={Favourites} />
              { /* Lazy loaded components wrapped in Suspense */ }
              {[
                { name: "Detail", component: ItemDetail },
                { name: "Cart", component: CartScreen },
                { name: "Mainmenu", component: Mainmenu },
                { name: "Register", component: Register },
                { name: "Login", component: Login },
                { name: "ResetPassword", component: ResetPassword },
                { name: "Category", component: Category },
                { name: "Code", component: Newcode },
                { name: "newpassword", component: Newpass },
                { name: "Profile", component: Profile },
                { name: "Products", component: Products },
                { name: "CreateProduct", component: CreateProduct },
                { name: "Items", component: Items, options: { headerShown: false }},
                { name: "Sales", component: Sales },
                { name: "MainSales", component: MainSales },
                { name: "Purchases", component: Purchases },
                { name: "Receipt", component: Receipt },
                { name: "PurchaseReceipt", component: PurchaseReceipt },
                { name: "CoolScreen", component: CoolScreen, options: { headerShown: false }},
                { name: "UploadImagePage", component: UploadImagePage, options: { headerShown: false }},
                { name: "mainbranch", component: Mainbranch },
                { name: "subbranch", component: SubBranch },
              ].map(({ name, component, options }) => (
                <Stack.Screen key={name} name={name} options={options}>
                  {() => (
                    <Suspense fallback={<Text>Loading component, please wait...</Text>}>
                      {/* Pass all props to component */}
                      {React.createElement(component)}
                    </Suspense>
                  )}
                </Stack.Screen>
              ))}
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
        </BasketProvider>
      </PaperProvider>
    </ThemeProvider>
  );
};

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
  updateButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
