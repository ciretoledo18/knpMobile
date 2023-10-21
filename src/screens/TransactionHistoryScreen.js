import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserOrders } from "../utils/api";

const TransactionHistoryScreen = ({ navigation }) => {
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
                const allOrders = await fetchUserOrders(userId);
                setOrderData(allOrders);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        {/* Add your logo image source and style */}
                        <Image
                            source={require('../assets/icon.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.headerText}>Transaction History</Text>

                        {orderData && orderData.length > 0 ? (
                            <ScrollView>
                                {orderData.map(order => (
                                    <View key={order.id} style={styles.orderContainer}>
                                        <Text>Order Number: {order.order_number}</Text>
                                        <Text>Total Price: {order.total_price}</Text>
                                        {/* Add more details as needed */}
                                    </View>
                                ))}
                            </ScrollView>
                        ) : (
                            <Text>Order your first coffee!</Text>
                        )}

                        {/* Back Button */}
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF', // Adjust background color as needed
    },
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100, // Adjust width as needed
        height: 100, // Adjust height as needed
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 10,
    },
    orderContainer: {
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    backButton: {
        backgroundColor: '#3E2723',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default TransactionHistoryScreen;
