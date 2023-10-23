import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import { fetchCategories, fetchProducts } from '../utils/api';
import { useCart } from '../utils/CartContext';

const MenuScreen = () => {
    const { dispatch } = useCart();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        setModalVisible(true);
    };

    const handleCategoryPress = async (category) => {
        try {
            const productsData = await fetchProducts(category.id);
            const filteredProducts = productsData.filter(
                (product) =>
                    product.category_id === category.id && product.availability === 'Yes'
            );

            setProducts(filteredProducts);
            setSelectedCategory(category);
        } catch (error) {
            console.error('Error fetching or filtering products:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.buttonContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryButton}
                            onPress={() => handleCategoryPress(category)}
                        >
                            <Text style={styles.categoryButtonText}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <ScrollView>
                <View>
                    {selectedCategory ? (
                        <View style={styles.productsContainer}>
                            {products.map((product) => (
                                <View key={product.id} style={styles.productItem}>
                                    <Image
                                        source={{
                                            uri: `https://kapenapud.com/storage/${product.image}`,
                                        }}
                                        style={styles.productImage}
                                    />
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productDescription}>
                                        {product.description}
                                    </Text>
                                    <Text style={styles.productPrice}>
                                        Price: ${product.price}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.addToCartButton}
                                        onPress={() => handleAddToCart(product)}
                                    >
                                        <Text style={styles.addToCartButtonText}>
                                            Add to Cart
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.centerIconContainer}>
                            <Image
                                source={require('../../assets/icon.png')}
                                style={styles.centerIcon}
                            />
                            <Text style={styles.centerIconText}>Select a category</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Item added to cart!</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 50,
    },
    categoryButton: {
        backgroundColor: '#675D50',
        paddingHorizontal: 20,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    categoryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    productsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        padding: 10,
    },
    productItem: {
        width: '48%',
        marginBottom: 20,
        marginRight: '2%',
        padding: 2,
        borderWidth: 1,
        borderRadius: 5,
    },
    productImage: {
        width: '100%',
        height: 100,
        borderRadius: 5,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    productDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    productPrice: {
        fontSize: 16,
        marginTop: 5,
    },
    addToCartButton: {
        backgroundColor: '#ABC4AA',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Modal styles
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#ABC4AA',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 25,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    centerIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerIcon: {
        width: 100, // Adjust the width and height as needed
        height: 100,
    },
    centerIconText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MenuScreen;
