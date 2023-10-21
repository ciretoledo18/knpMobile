import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { fetchUserOrders } from '../utils/api';

const RewardScreen = () => {
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
                const allOrders = await fetchUserOrders(userId);

                const userOrders = allOrders.filter((order) => order.user_id === userId);
                setOrderData(userOrders);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const qrCodeData = 'https://kapenapud.com'; // URL to link

    const handleTransactionHistoryPress = () => {
        navigation.navigate('Orders');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Scan QR for Rewards!</Text>

            {/* QR Code with Logo */}
            <View style={styles.qrCodeContainer}>
                <QRCode
                    value={qrCodeData}
                    size={200}
                    logoSize={50}
                    logoBackgroundColor="transparent"
                />
            </View>

            {/* Button to navigate to TransactionHistoryScreen */}
            <TouchableOpacity style={styles.buttonContainer} onPress={handleTransactionHistoryPress}>
                <Text style={styles.buttonText}>View Transaction History</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5', // Background color for the coffee shop theme
    },
    headerText: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    qrCodeContainer: {
        backgroundColor: '#FFFFFF', // QR code background color
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
    },
    buttonContainer: {
        backgroundColor: '#8D6E63', // Button color
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF', // Button text color
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RewardScreen;
