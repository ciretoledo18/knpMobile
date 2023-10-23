import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchAllOrders, fetchProducts, fetchRewards, fetchUserOrders } from '../../utils/api';
import { playSound } from '../../utils/StaffSoundUtility';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const StaffHomeScreen = () => {
    const [orderData, setOrderData] = useState(null);
    const [rewardsData, setRewardsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const [prevPendingOrdersCount, setPrevPendingOrdersCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allRewards = await fetchRewards();
                const allProducts = await fetchProducts();
                const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
                const featuredProducts = allProducts.filter((product) => product.is_featured === 1);
                const allOrders = await fetchAllOrders();

                const pendingOrdersCount = allOrders.filter((order) => order.status === 0).length;
                if (pendingOrdersCount > prevPendingOrdersCount) {
                    playSound();
                }

                setPrevPendingOrdersCount(pendingOrdersCount);

                setOrderData(allOrders);
                setProducts(featuredProducts);
                setRewardsData(allRewards);
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
    }, [navigation, prevPendingOrdersCount]);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <SafeAreaView style={styles.safeAreaViewContainer} >
            <View style={styles.container}>
                {/* Pending Orders Section */}
                <TouchableOpacity
                    style={styles.pendingOrdersContainer}
                    onPress={() => navigation.navigate('StaffPending')}
                >
                    <View style={styles.pendingOrdersLeftColumn}>
                        <Icon name="cart" size={width * 0.15} color="#FFF" style={styles.cartIcon} />
                        <Text style={styles.pendingOrdersTitle}>Orders Pending</Text>
                    </View>
                    <View style={styles.pendingOrdersRightColumn}>
                        <Text style={styles.pendingOrdersCount}>
                            {orderData && orderData.filter((order) => order.status === 0).length}
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Rewards and Featured Products Section */}
                {isLoading ? (
                    <Text>Loading data...</Text>
                ) : (
                    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                        {/* Rewards Section */}
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

                        {/* Featured Products Section */}
                        <Text style={styles.featuredProductsTitle}>Featured Products</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    rewardsContainer: {
        marginBottom: height * 0.02,
        padding:2
    },
    rewardsTitle: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
        backgroundColor: '#F2F2F2',
        borderRadius: width * 0.02,
        padding: width * 0.03,
        width: '100%',
        marginHorizontal: width * 0.02,
    },
    rewardImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1,
        marginRight: width * 0.03,
    },
    rewardTextContainer: {
        flex: 1,
    },
    rewardName: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    featuredProductsTitle: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
        backgroundColor: '#FFFFFF',
        borderRadius: width * 0.02,
        padding: width * 0.03,
        width: '100%',
        marginHorizontal: width * 0.02,
    },
    cardImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.025,
        marginRight: width * 0.03,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardName: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    cardDescription: {
        color: '#666666',
    },
    pendingOrdersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: height * 0.02,
        width: '100%',
        backgroundColor: '#F3DEBA',
        borderRadius: width * 0.02,
    },
    pendingOrdersLeftColumn: {
        alignItems: 'center',
        backgroundColor: '#675D50',
        padding: width * 0.03,
    },
    cartIcon: {
        width: width * 0.15,
        height: width * 0.15,
        marginBottom: height * 0.01,
    },
    pendingOrdersTitle: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: 'white',
    },
    pendingOrdersRightColumn: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    loadingStyle: {
        width: width * 0.15,
        height: width * 0.15,
        backgroundColor: '#FFF',
        marginBottom: height * 0.01,
        borderRadius: width * 0.02,
    },
    pendingOrdersCount: {
        fontSize: width * 0.25,
        fontWeight: 'bold',
        color: '#675D50',
    },
});

export default StaffHomeScreen;
