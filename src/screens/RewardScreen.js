import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { fetchCustomers } from '../utils/api';
import { SafeAreaView } from 'react-native-safe-area-context';

const RewardScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const [customerData, setCustomerData] = useState(null);
    const [stamps, setStamps] = useState(0); // Assuming stamps are used for rewards

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
                const allCustomers = await fetchCustomers();
                const currentCustomer = allCustomers.find(customer => customer.user_id === userId);

                const totalStamps = currentCustomer.rewards;
                setStamps(totalStamps);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [navigation]);

    const qrCodeData = 'https://kapenapud.com'; // URL to link

    const handleTransactionHistoryPress = () => {
        navigation.navigate('Orders');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Scan QR for Rewards!</Text>

            {stamps > 0 ? (
                // Display the number of stamps and show the single icon
                <View style={styles.rewardContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.rewardIcon} />
                    <Text style={styles.rewardText}>{Math.round(stamps)} Stamps Collected</Text>
                </View>
            ) : (
                // Show a message prompting the user to check current promotions
                <View style={styles.promotionContainer}>
                    <Text style={styles.promotionText}>
                        Check out our current promotions to learn how to get rewarded!
                    </Text>
                </View>
            )}

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
        </SafeAreaView>
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
    rewardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rewardIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    rewardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    promotionContainer: {
        marginBottom: 20,
    },
    promotionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#8D6E63', // Adjust color as needed
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
