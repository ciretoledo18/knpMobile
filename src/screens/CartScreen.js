import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useCart } from '../utils/CartContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {fetchPayMethod} from "../utils/api";

// Header component for the cart table
const CartHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Product</Text>
            <Text style={styles.headerText}>Quantity</Text>
            <Text style={styles.headerText}>Price</Text>
            <Text style={styles.headerText}>Subtotal</Text>
        </View>
    );
};

const CartScreen = () => {
    const navigation = useNavigation();

    const { state, dispatch } = useCart();
    const { cart } = state;
    const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
    const [isOrderNumberModalVisible, setOrderNumberModalVisible] = useState(false);
    const [isClearCartModalVisible, setClearCartModalVisible] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [payMethod, setPayMethod] = useState(null);

    // Calculate the total by iterating through the cart items
    const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const handleConfirmOrder = async () => {
        try {
            // Retrieve the user ID from AsyncStorage
            const userId = await AsyncStorage.getItem('userId');
            const payMethod = await fetchPayMethod();
            const orderNumber = Math.floor(Math.random() * 90000) + 10000;

            // Create the checkout data
            const checkoutData = {
                orderNumber,
                userId,
                paymentId: 1,
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

    const handleClearCartConfirmed = () => {
        // Clear the cart
        dispatch({ type: 'CLEAR_CART' });
        // Close the modal
        setClearCartModalVisible(false);
    };

    const handleCheckoutPress = () => {
        if (cart.length === 0) {
            // If the cart is empty, show an alert
            alert('Your cart is empty. Add items before checking out.');
        } else {
            // If the cart is not empty, show the checkout modal
            setCheckoutModalVisible(true);
        }
    };

    const handleOrderNumberModalClose = () => {
        // Close the order number modal
        setOrderNumberModalVisible(false);
        // Navigate back to KioskHome
        navigation.navigate('Dashboard');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Order Summary</Text>
                {cart.length > 0 ? (
                    <FlatList
                        ListHeaderComponent={<CartHeader />} // Add the table header
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Text style={styles.cartItemText}>{item.name}</Text>
                                <Text style={styles.cartItemText}>{item.quantity}</Text>
                                <Text style={styles.cartItemText}>₱{item.price}</Text>
                                <Text style={styles.cartItemText}>
                                    ₱{item.quantity * item.price}
                                </Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text>Your cart is empty</Text>
                )}
                <Text style={styles.totalText}>Total: ₱{total}</Text>
                <TouchableOpacity
                    style={styles.clearCartButton}
                    onPress={() => setClearCartModalVisible(true)}
                >
                    <Text style={styles.clearCartButtonText}>Clear Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={handleCheckoutPress}
                >
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>

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

                {/* Clear Cart Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isClearCartModalVisible}
                    onRequestClose={() => setClearCartModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Are you sure?</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                handleClearCartConfirmed();
                            }}
                        >
                            <Text style={styles.modalButtonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.declineButton}
                            onPress={() => {
                                setClearCartModalVisible(false);
                            }}
                        >
                            <Text style={styles.declineButtonText}>Cancel</Text>
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
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
    headerText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
        paddingBottom: 8,
    },
    cartItemText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    confirmButton: {
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        borderWidth: 3,
        borderColor: '#675D50',
        width: '75%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40%',
        margin: '15%',
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
    checkoutButton: {
        backgroundColor: '#ABC4AA',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    checkoutButtonText: {
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
    clearCartButton: {
        backgroundColor: '#FF6F61',  // You can customize the color
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    clearCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
