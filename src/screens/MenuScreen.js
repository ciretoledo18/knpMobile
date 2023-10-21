import React, {useState, useEffect, forwardRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
} from 'react-native';
import { fetchCategories, fetchProducts } from '../utils/api';
import {useCart} from "../utils/CartContext";
import Toast from "react-native-toast-message"; // Adjust the path based on your actual file structure

const MenuScreen = () => {
    const { dispatch } = useCart();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                // Handle error (e.g., display an error message to the user)
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchData();
    }, []);
    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        showToast();
    };

    const handleCategoryPress = async (category) => {
        try {
            // Fetch products related to the selected category
            const productsData = await fetchProducts(category.id);

            // Filter products based on the selected category's ID and availability
            const filteredProducts = productsData.filter(
                (product) => product.category_id === category.id && product.availability === 'Yes'
            );

            setProducts(filteredProducts);
            setSelectedCategory(category);
        } catch (error) {
            // Handle error (e.g., display an error message to the user)
            console.error('Error fetching or filtering products:', error.message);
        }
    };
    const ToastComponent = forwardRef((props, ref) => {
        return <Toast {...props} ref={ref} />;
    });
    const showToast = () => {
        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Item added to cart!',
            visibilityTime: 1000, // 3 seconds
            autoHide: true,
            topOffset: StatusBar.currentHeight + 10,
        });
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
                    {selectedCategory && (
                        <View style={styles.productsContainer}>
                            {products.map((product) => (
                                <View key={product.id} style={styles.productItem}>
                                    <Image
                                        source={{ uri: `https://kapenapud.com/storage/${product.image}` }}
                                        style={styles.productImage}
                                    />
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productDescription}>{product.description}</Text>
                                    <Text style={styles.productPrice}>Price: ${product.price}</Text>
                                    <TouchableOpacity
                                        style={styles.addToCartButton}
                                        onPress={() => handleAddToCart(product)}
                                    >
                                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        height:50,
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
        flexWrap: 'wrap',  // Allow items to wrap to the next row
        marginTop: 20,
        padding: 10,

    },
    productItem: {
        width: '48%',  // Set the width to occupy approximately half of the container
        marginBottom: 20,
        marginRight: '2%',  // Add a small margin between items
        padding: 2,
        borderWidth: 1,
        borderRadius: 5,
    },
    productImage: {
        width: '100%',  // Take up the full width of the item
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
});

export default MenuScreen;
