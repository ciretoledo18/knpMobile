// src/utils/api.js

import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'https://kapenapud.com/api';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password,
        });

        const { token, user } = response.data;

        // Store the token and user ID in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userId', user.id.toString());


        return token;
    } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
    }
};
export const getToken = async () => {
    try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token not found.');
        }

        return token;
    } catch (error) {
        console.error('Error fetching token:', error.message);
        throw error;
    }
};

export const fetchUserData = async (userId) => {
    try {
        const token = await getToken(); // Retrieve the authentication token

        const response = await axios.get(`${BASE_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        });

        return response.data.data;
    } catch (error) {
        // Handle error (e.g., display an error message to the user)
        console.error('Error fetching user data:', error.message);
        throw error;
    }
};

export const fetchUsers = async () => {
    try {
        const token = await getToken(); // Retrieve the authentication token

        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        });

        return response.data.data;
    } catch (error) {
        // Handle error (e.g., display an error message to the user)
        console.error('Error fetching all users:', error.message);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data.data;
    } catch (error) {
        // Handle error (e.g., display an error message to the user)
        console.error('Error fetching categories:', error.message);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data.data;
    } catch (error) {
        // Handle error (e.g., display an error message to the user)
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

export const fetchCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/customers`);
        return response.data.data;
    } catch (error) {
        // Handle error (e.g., display an error message to the user)
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

export const fetchUserOrders = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/order/list/${userId}`);
        return response.data.data;
    } catch (error) {
        // Handle error (e.g., display an error message to the user)
        console.error('Error fetching all orders:', error.message);
        throw error;
    }
};