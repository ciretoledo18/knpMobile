import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import {fetchProducts, fetchRewards, fetchUserOrders} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
    const [orderData, setOrderData] = useState(null);
    const [rewardsData, setRewardsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const navigation = useNavigation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const allRewards = await fetchRewards();
                const allProducts = await fetchProducts();
                const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
                const featuredProducts = allProducts.filter((product) => product.is_featured === 1);
                const allOrders = await fetchUserOrders(userId);

                setOrderData(allOrders);
                setProducts(featuredProducts); // Set featured products
                setRewardsData(allRewards);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 20000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [navigation]);

    const formatDate = (dateString) => {
        const options = {month: 'short', day: 'numeric', year: 'numeric'};
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };


    return (
        <View style={styles.container}>
            {/* Rewards and Featured Products Section */}
            {isLoading ? (
                <Text>Loading data...</Text>
            ) : (
                <View style={styles.contentContainer}>
                    {/* Rewards Section */}
                    <Text style={styles.rewardsTitle}>Current Promotion/s</Text>
                    <ScrollView style={styles.rewardsContainer}>
                        {rewardsData && rewardsData.length > 0 ? (
                            rewardsData.map((reward, index) => (
                                <View key={index} style={styles.rewardItem}>
                                    <Image style={styles.rewardImage} source={require('../assets/icon.png')}/>
                                    <View style={styles.rewardTextContainer}>
                                        <Text style={styles.rewardName}>{reward.name}</Text>
                                        <Text>{reward.description}</Text>
                                        <Text>
                                            Valid thru {formatDate(reward.start_date)} - {formatDate(reward.end_date)}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text>No rewards available.</Text>
                        )}
                    </ScrollView>

                    {/* Featured Products Section */}
                    <Text style={styles.featuredProductsTitle}>Featured Products</Text>
                    <ScrollView style={styles.featuredProductsContainer}>
                        {products.map((product, index) => (
                            <View key={index} style={styles.cardContainer}>
                                <Image style={styles.cardImage}
                                       source={{uri: `http://kapenapud.com/storage/${product.image}`}}/>
                                <View style={styles.cardTextContainer}>
                                    <Text style={styles.cardName}>{product.name}</Text>
                                    <Text style={styles.cardDescription}>{product.description}</Text>
                                    {/* Add more product details as needed */}
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Pending Orders Section */}
                    <TouchableOpacity style={styles.pendingOrdersContainer}
                                      onPress={() => navigation.navigate('PendingScreen')}>
                        <View style={styles.pendingOrdersLeftColumn}>
                            <Icon name="cart" size={50} color="#FFF" style={styles.cartIcon}/>
                            <Text style={styles.pendingOrdersTitle}>Orders Pending</Text>
                        </View>
                        <View style={styles.pendingOrdersRightColumn}>
                            <Text style={styles.pendingOrdersCount}>
                                {orderData && orderData.filter((order) => order.status === 0).length}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ABC4AA', // Adjust to your background color
    },
    contentContainer: {
        width: '90%',
    },
    rewardsContainer: {
        marginBottom: 20,
    },
    rewardsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        width: '100%',
    },
    rewardImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    rewardTextContainer: {
        flex: 1,
    },
    rewardName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    featuredProductsContainer: {},
    featuredProductsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        width: '100%',
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 15,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        color: '#666666',
    },
    pendingOrdersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: '100%',
        backgroundColor: '#F3DEBA', // Background color for the whole section
        borderRadius: 10,
    },
    pendingOrdersLeftColumn: {
        alignItems: 'center',
        backgroundColor: '#675D50',
        padding: 10,
    },
    cartIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    pendingOrdersTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    pendingOrdersRightColumn: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingStyle: {
        width: 50, // Adjust the width as needed
        height: 50, // Adjust the height as needed
        backgroundColor: '#FFF', // Background color for the loading style
        marginBottom: 10,
        borderRadius: 10,
    },
    pendingOrdersCount: {
        fontSize: 90,
        fontWeight: 'bold',
        color: '#675D50',
    },
});

export default HomeScreen;
