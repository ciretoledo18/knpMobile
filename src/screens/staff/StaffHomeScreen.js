import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchAllOrders, fetchProducts, fetchRewards } from '../../utils/api';
import { playSound } from '../../utils/StaffSoundUtility';
import { SafeAreaView } from 'react-native-safe-area-context';

const StaffHomeScreen = () => {
    const [orderData, setOrderData] = useState(null);
    const [rewardsData, setRewardsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [unavailable, setUnavailable] = useState([]);

    const navigation = useNavigation();
    const [prevPendingOrdersCount, setPrevPendingOrdersCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allRewards = await fetchRewards();
                const allProducts = await fetchProducts();
                const featuredProducts = allProducts.filter((product) => product.is_featured === 1);
                const unavailableProducts = allProducts.filter((product) => product.availability === "No");

                const allOrders = await fetchAllOrders();

                const pendingOrdersCount = allOrders.filter((order) => order.status === 0).length;
                if (pendingOrdersCount > prevPendingOrdersCount) {
                    playSound();
                }

                // console.log(unavailableProducts)

                setPrevPendingOrdersCount(pendingOrdersCount);

                setOrderData(allOrders);
                setProducts(featuredProducts);
                setUnavailable(unavailableProducts)
                setRewardsData(allRewards);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 7000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [navigation, prevPendingOrdersCount]);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <SafeAreaView style={styles.safeAreaViewContainer} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.pendingOrdersContainer}
                    onPress={() => navigation.navigate('StaffPending')}
                >
                    <View style={styles.pendingOrdersLeftColumn}>
                        <Icon name="cart" size={24} color="#FFF" style={styles.cartIcon} />
                        <Text style={styles.pendingOrdersTitle}>Orders Pending</Text>
                    </View>
                    <View style={styles.pendingOrdersRightColumn}>
                        <Text style={styles.pendingOrdersCount}>
                            {orderData && orderData.filter((order) => order.status === 0).length}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>

                {/* Left Column - Orders Pending Section */}
                <View style={styles.leftColumn}>
                    {isLoading ? (
                        <Text>Loading data...</Text>
                    ) : (
                        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                            {/* Promotions Section */}
                            <Text style={styles.rewardsTitle}>Current Promotion/s</Text>
                            <ScrollView style={styles.rewardsContainer} showsVerticalScrollIndicator={false}>
                                {rewardsData && rewardsData.length > 0 ? (
                                    rewardsData.map((reward, index) => (
                                        <View key={index} style={styles.rewardItem}>
                                            <Image style={styles.rewardImage} source={require('../../assets/icon.png')} />
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
                            <Text style={styles.featuredProductsTitle}>Unavailable Product/s</Text>
                            <ScrollView style={styles.featuredProductsContainer}>
                                {unavailable.map((product, index) => (
                                    <View key={index} style={styles.cardContainer}>
                                        <Image
                                            style={styles.cardImage}
                                            source={{ uri: `http://kapenapud.com/storage/${product.image}` }}
                                        />
                                        <View style={styles.cardTextContainer}>
                                            <Text style={styles.cardName}>{product.name}</Text>
                                            <Text style={styles.cardDescription}>{product.description}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </ScrollView>

                    )}
                </View>

                {/* Right Column - Promotions and Featured Products Section */}
                <View style={styles.rightColumn}>
                    {isLoading ? (
                        <Text>Loading data...</Text>
                    ) : (
                        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                            <Text style={styles.featuredProductsTitle}>Featured Products</Text>
                            {/* Featured Products Section */}
                            <ScrollView style={styles.featuredProductsContainer}>
                                {products.map((product, index) => (
                                    <View key={index} style={styles.cardContainer}>
                                        <Image
                                            style={styles.cardImage}
                                            source={{ uri: `http://kapenapud.com/storage/${product.image}` }}
                                        />
                                        <View style={styles.cardTextContainer}>
                                            <Text style={styles.cardName}>{product.name}</Text>
                                            <Text style={styles.cardDescription}>{product.description}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </ScrollView>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: '#ABC4AA',
    },
    container: {
        flex: 1,
        flexDirection: 'row', // Use flexDirection: 'row' to create columns
        justifyContent: 'space-between', // Add space between columns
        alignItems: 'stretch', // Stretch columns to full height
    },
    headerContainer: {
        backgroundColor: 'white',
    },
    leftColumn: {
        flex: 1, // Take 50% of the width
    },
    rightColumn: {
        flex: 1, // Take 50% of the width
    },
    contentContainer: {
        marginTop: 10,
        flex: 1,
        padding: 8,
    },
    rewardsContainer: {
        flex: 1,
        marginBottom: 8,
        padding: 2,
    },
    rewardsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    rewardItem: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 4,
        padding: 8,
        width: '100%',
        marginHorizontal: 4,
    },
    rewardImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    rewardTextContainer: {
        flex: 1,
    },
    rewardName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    featuredProductsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 8,
        width: '100%',
        marginHorizontal: 4,
    },
    cardImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: 8,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardDescription: {
        color: '#666666',
    },
    pendingOrdersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#F3DEBA',
        borderRadius: 4,
    },
    pendingOrdersLeftColumn: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#675D50',
        padding: 8,
    },
    cartIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    pendingOrdersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    pendingOrdersRightColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingStyle: {
        width: 36,
        height: 36,
        backgroundColor: '#FFF',
        marginBottom: 8,
        borderRadius: 4,
    },
    pendingOrdersCount: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#675D50',
    },
});

export default StaffHomeScreen;
