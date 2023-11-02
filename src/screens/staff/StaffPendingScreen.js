import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    FlatList,
    ScrollView,
} from 'react-native';
import {
    fetchAllOrders,
    fetchProducts,
    updateOrderStatus,
} from '../../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const StaffPendingScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchData = async () => {
        try {
            const allOrders = await fetchAllOrders();
            const products = await fetchProducts();
            const pendingOrders = allOrders.filter(order => order.status === 0);

            setOrderData(pendingOrders);
            setAllProducts(products);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedOrder) {
            fetchData();
        }
    }, [selectedOrder]);

    const findProductName = (productId) => {
        const product = allProducts.find((product) => product.id === productId);
        return product ? product.name : 'Product not found';
    };

    const handleCompleteOrder = async () => {
        try {
            if (selectedOrder) {
                await updateOrderStatus(selectedOrder.id);
                setSelectedOrder(null);
            }
        } catch (error) {
            console.error('Error completing order:', error.message);
        }
    };

    const renderItem = ({ item }) => (
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
                <Icon name="clock-o" size={20} color="#000" style={styles.clockIcon} />
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
                    <Text style={styles.subHeaderText}>
                        No current customer orders!
                    </Text>
                )}

                <Modal
                    visible={selectedOrder !== null}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Order Details</Text>
                                <TouchableOpacity
                                    style={styles.closeModalButton}
                                    onPress={() => setSelectedOrder(null)}
                                >
                                    <Text style={styles.closeModalText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={styles.scrollView}>
                                {selectedOrder &&
                                    selectedOrder.order_product.map(renderOrderItem)}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.completeButton}
                                onPress={handleCompleteOrder}
                            >
                                <Text style={styles.completeButtonText}>Complete</Text>
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
        textAlign: 'center',
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
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
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
    },
    closeModalText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completeButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    completeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subHeaderText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default StaffPendingScreen;
