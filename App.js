// App.js
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from "./src/screens/RegisterScreen";
import BottomNavigator from "./src/components/navigator";
import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import StaffHomeScreen from "./src/screens/staff/StaffHomeScreen";
import StaffNavigator from "./src/components/staffnavigator";
import PendingScreen from "./src/screens/PendingScreen";
import {CartProvider} from "./src/utils/CartContext";
import HomeScreen from "./src/screens/HomeScreen";
import StaffPendingScreen from "./src/screens/staff/StaffPendingScreen";
import StaffProfileScreen from "./src/screens/staff/StaffProfileScreen";
import StaffPosScreen from "./src/screens/staff/StaffPosScreen";
import KioskNavigator from "./src/components/kiosknavigator";
import KioskPaymentScreen from "./src/screens/staff/KioskPaymentScreen";
import QRScanner from "./src/utils/QRScanner";
import PaymentScreen from "./src/screens/PaymentScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <CartProvider>

            <Stack.Navigator>

                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

                {/*Customer*/}

                <Stack.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Orders" component={TransactionHistoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PendingScreen" component={PendingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />

                {/*Staff*/}
                <Stack.Screen name="StaffNav" component={StaffNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="StaffHome" component={StaffHomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="StaffPos" component={StaffPosScreen} options={{ headerShown: false }} />
                <Stack.Screen name="StaffPending" component={StaffPendingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="StaffProfile" component={StaffProfileScreen} options={{ headerShown: false }} />

                {/*Kiosk*/}
                <Stack.Screen name="KioskNav" component={KioskNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="KioskPayment" component={KioskPaymentScreen} options={{ headerShown: false }} />
                <Stack.Screen name="QRScanner" component={QRScanner} options={{ headerShown: false }} />


            </Stack.Navigator>
            </CartProvider>
        </NavigationContainer>
    );
};

export default App;
