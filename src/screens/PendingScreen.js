import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchProducts, fetchUserOrders} from '../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const PendingScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
                const allOrders = await fetchUserOrders(userId);
                const products = await fetchProducts();
                const pendingOrders = allOrders.filter((order) => order.status === 0);
                // console.log(allOrders)
                setOrderData(pendingOrders);
                setAllProducts(products);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigation]);

    const findProductName = (productId) => {
        const product = allProducts.find((product) => product.id === productId);
        return product ? product.name : 'Product not found';
    };

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={styles.orderButton}
            onPress={() => setSelectedOrder(item)}
        >
            <View style={styles.orderInfo}>
                <View>
                    <Text>{`Order Number: ${item.order_number}`}</Text>
                    <Text>{`Items: ${item.order_product.length}`}</Text>
                    <Text>{`Total Price: ₱${item.total_price}`}</Text>
                </View>
                <Icon name="clock-o" size={20} color="#000" style={styles.clockIcon}/>
            </View>
        </TouchableOpacity>
    );

    const renderOrderItem = (item, index) => (
        <View key={index} style={styles.orderItemContainer}>
            <Text>{`Name: ${findProductName(item.product_id)}`}</Text>
            <Text>{`Quantity: ${Math.round(item.quantity)}`}</Text>
            <Text>{`Price: ₱${item.price}`}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.headerText}>Pending Orders</Text>

                {isLoading ? (
                    <Text>Loading...</Text>
                ) : orderData && orderData.length > 0 ? (
                    <FlatList
                        data={orderData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text style={styles.subHeaderText}>No pending orders. Have another cup with us!</Text>
                )}

                {/* Modal for displaying order details */}
                <Modal
                    visible={selectedOrder !== null}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Order Details</Text>
                            <ScrollView style={styles.scrollView}>
                                {selectedOrder &&
                                    selectedOrder.order_product.map(renderOrderItem)}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.closeModalButton}
                                onPress={() => setSelectedOrder(null)}
                            >
                                <Text style={styles.closeModalText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    orderButton: {
        backgroundColor: '#E0E0E0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clockIcon: {
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollView: {
        maxHeight: '60%',
    },
    orderItemContainer: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    closeModalButton: {
        backgroundColor: '#3E2723',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    closeModalText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default PendingScreen;
