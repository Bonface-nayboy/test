import React, { Suspense, lazy } from 'react';
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


// Lazy load screens
const ItemDetail = lazy(() => import('./components/others/staticitems'));
const CartScreen = lazy(() => import('./components/others/CartScreen'));
const Register = lazy(() => import('./components/home/login/register'));
const Login = lazy(() => import('./components/home/login/login'));
// const MainScreen = lazy(() => import('./screens/MainScreen'));
const ResetPassword = lazy(() => import('./components/home/login/resetpassword'));
const Newcode = lazy(() => import('./components/home/login/Code'));
const Newpass = lazy(() => import('./components/home/login/newpassword'));
const Gunners = lazy(() => import('./components/home/login/Gunners'));
// const Homepage = lazy(() => import('./screens/homepage'));
const Mainmenu = lazy(() => import('./components/others/menu'));
const Profile = lazy(() => import('./components/home/Profile'));
const Products = lazy(() => import('./components/others/products'));
const CreateProduct = lazy(() => import('./components/others/productsCreated'));
const Items = lazy(() => import('./screens/Items'));
const Sales = lazy(() => import('./screens/sales/sales'));
const Purchases = lazy(() => import('./screens/purchases/purchases'));
const Receipt = lazy(() => import('./screens/sales/Receipt'));
const CoolScreen = lazy(() => import('./screens/coolscreen'));
const MainSales = lazy(() => import('./screens/sales/mainSales'));
const PurchaseReceipt = lazy(() => import('./screens/purchases/PurchaseReceipt'));
const Category = lazy(() => import('./components/others/category'));

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
        <BasketProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Root">
              <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
              {/* <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} /> */}
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Favourites" component={Favourites} />
              <Stack.Screen name="Detail">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}>
                    <ItemDetail />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Cart">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <CartScreen />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Mainmenu">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Mainmenu />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Register />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Login">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Login />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="ResetPassword">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <ResetPassword />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Category">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Category />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Code">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Newcode />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="newpassword">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Newpass />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Gunners" options={{ headerShown: false }}>
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Gunners />
                  </Suspense>
                )}
              </Stack.Screen>
              {/* <Stack.Screen name="homepage" options={{ headerShown: false }}>
              {() => (
                <Suspense fallback={<Text>Loading component, please wait...</Text>}
>
                  <Homepage />
                </Suspense>
              )}
            </Stack.Screen> */}
              <Stack.Screen name="Profile">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Profile />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Products">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Products />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="CreateProduct">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <CreateProduct />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Items" options={{ headerShown: false }}>
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Items />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Sales">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Sales />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="MainSales">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <MainSales />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Purchases">
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <Purchases />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="Receipt">
                {props => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}>
                    <Receipt {...props} />
                  </Suspense>
                )}
              </Stack.Screen>  

              <Stack.Screen name="PurchaseReceipt">
                {props => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}>
                    <PurchaseReceipt {...props} />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="CoolScreen" options={{ headerShown: false }}>
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <CoolScreen />
                  </Suspense>
                )}
              </Stack.Screen>
              <Stack.Screen name="UploadImagePage" options={{ headerShown: false }}>
                {() => (
                  <Suspense fallback={<Text>Loading component, please wait...</Text>}
                  >
                    <UploadImagePage />
                  </Suspense>
                )}
              </Stack.Screen>
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
        </BasketProvider>
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
