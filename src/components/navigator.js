import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import RewardScreen from '../screens/RewardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import { CartProvider } from '../utils/CartContext';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
    return (
            <Tab.Navigator
                barStyle={{ backgroundColor: '#A9907E' }}
                activeColor="#675D50"
                inactiveColor="#F3DEBA"
                shifting={true}
            >
                <Tab.Screen
                    name="Dashboard"
                    component={HomeScreen}

                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="food" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="cart" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reward"
                    component={RewardScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="star" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="account" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
    );
};

export default BottomNavigator;
