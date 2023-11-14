import React, { useEffect, useState } from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPayMethod } from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useCart} from "../utils/CartContext";

const KioskPaymentScreen = () => {
    const navigation = useNavigation();
    const [payMethods, setPayMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const { state, dispatch } = useCart();
    const { cart } = state;
    const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
    const [isOrderNumberModalVisible, setOrderNumberModalVisible] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentMethods = await fetchPayMethod();
                setPayMethods(paymentMethods);
            } catch (error) {
                console.error('Error fetching payment methods:', error.message);
            }
        };

        fetchData();
    }, []);

    const handlePayMethodButtonPress = (method) => {
        // Handle the logic when a payment method button is pressed
        setSelectedMethod(method);
    };

    const handleBackButtonPress = () => {
        // Navigate back to the previous screen
        navigation.goBack();
    };
    const handleCheckoutPress = () => {
        // Navigate to OrderScreen, passing the selected payment method if needed
        setCheckoutModalVisible(true);

    };
    const handleOrderNumberModalClose = () => {
        // Close the order number modal
        setOrderNumberModalVisible(false);
        // Navigate back to KioskHome
        navigation.navigate('KioskHome');
    };
    const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const handleConfirmOrder = async () => {
        try {
            // Retrieve the user ID from AsyncStorage
            const userId = await AsyncStorage.getItem('userId');
            const payMethod = selectedMethod;
            const orderNumber = Math.floor(Math.random() * 90000) + 10000;

            // Create the checkout data
            const checkoutData = {
                orderNumber,
                userId,
                paymentId: payMethod.id,
                totalPrice: total,
                cartItems: cart.map((item) => ({
                    productId: item.id,
                    price: item.price,
                    quantity: item.quantity,
                })),
            };

            // Make a POST request to kapenapud.com/api/order/checkout
            const response = await axios.post(
                'https://kapenapud.com/api/order/checkout',

                checkoutData
            );

            // Dispatch the 'CONFIRM_ORDER' action
            dispatch({ type: 'CONFIRM_ORDER' });

            // Set the order number for displaying in the modal
            setOrderNumber(orderNumber);

            // Show the order number modal
            setOrderNumberModalVisible(true);

            // Close the checkout modal
            setCheckoutModalVisible(false);

            // Handle the response, for example, display a success message
        } catch (error) {
            // Handle the error, for example, display an error message
            console.error('Error confirming order:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity
                onPress={handleBackButtonPress}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>{'< Back'}</Text>
            </TouchableOpacity>

            <View style={styles.leftColumn}>
                {/* Your payment method buttons go here */}
                <View style={styles.leftHeader}>
                    <Text style={styles.noteText}>Select the payment method.</Text>
                </View>
                {payMethods.map((payMethod) => (
                    <TouchableOpacity
                        key={payMethod.id}
                        onPress={() => handlePayMethodButtonPress(payMethod)}
                        style={styles.paymentMethodButton}
                    >
                        <Text style={styles.buttonText}>{payMethod.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.rightColumn}>
                {/* Display instructions based on the selected payment method's ID */}
                {selectedMethod && (
                    <View>
                        {selectedMethod.id === 1 ? (
                            <Text style={styles.noteText}>Please take note your Order Number and pay at the counter to complete your order.</Text>
                        ) : selectedMethod.id === 2 ? (
                            <>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={require('../assets/gcash.jpg')}
                                        style={styles.gCash} // Adjust the size as needed
                                    />
                                    <Text style={styles.noteText}>Please scan the QR code in the GCash app, enter your order number in the message box after checkout and pay the exact amount to complete your order.</Text>

                                </View>
                            </>
                        ) : null}
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={handleCheckoutPress}
                        >
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {/* Checkout Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isCheckoutModalVisible}
                    onRequestClose={() => setCheckoutModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm order?</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                handleConfirmOrder();
                            }}
                        >
                            <Text style={styles.modalButtonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.declineButton}
                            onPress={() => {
                                setCheckoutModalVisible(false);
                            }}
                        >
                            <Text style={styles.declineButtonText}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* Order Number Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOrderNumberModalVisible}
                    onRequestClose={handleOrderNumberModalClose}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Order Confirmed!</Text>
                        <Text style={styles.modalText}>Order Number: {orderNumber}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleOrderNumberModalClose}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#675D50',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        zIndex: 1,
        marginTop: 5,
    },
    paymentMethodButton: {
        width: '80%',
        height: '30%',
        backgroundColor: '#A9907E',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        justifyContent: 'center',
    },
    backButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    noteText: {
        marginTop: 20,
        paddingRight: 30,
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    gCash: {
        marginTop: 20,
        height: '60%', // Adjust the height as needed
        resizeMode: 'contain',
    },

    checkoutButton: {
        backgroundColor: '#ABC4AA',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 30,
        marginRight: 16,
        marginTop: 16
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    leftHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    modalContainer: {
        borderWidth: 3,
        borderColor: '#675D50',
        width: '30%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
        marginLeft: '35%',
        borderRadius: 8,
        backgroundColor: '#F3DEBA'
    },
    modalTitle: {
        fontSize: 25,
        marginBottom: 16,
        fontWeight: 'bold',

    },
    modalText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalButton: {
        backgroundColor: '#675D50',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    declineButton: {
        backgroundColor: '#FF6F61',  // You can customize the color
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    declineButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default KioskPaymentScreen;
