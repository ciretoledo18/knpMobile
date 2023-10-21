import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { fetchProducts, fetchRewards } from '../utils/api';

const HomeScreen = () => {
    const [rewardsData, setRewardsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allRewards = await fetchRewards();
                const allProducts = await fetchProducts();

                const featuredProducts = allProducts.filter((product) => product.is_featured === 1);
                setProducts(featuredProducts); // Set featured products
                setRewardsData(allRewards);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);



    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
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
                                    <Image
                                        style={styles.rewardImage}
                                        source={require('../assets/icon.png')}
                                    />
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
                                    {/* Add more product details as needed */}
                                </View>
                            </View>
                        ))}
                    </ScrollView>
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
});

export default HomeScreen;
