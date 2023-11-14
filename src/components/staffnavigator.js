import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StaffHomeScreen from "../screens/staff/StaffHomeScreen";
import StaffProfileScreen from "../screens/staff/StaffProfileScreen";
import StaffPosScreen from "../screens/staff/StaffPosScreen";
import StaffStockScreen from "../screens/staff/StaffStockScreen";

const Tab = createMaterialBottomTabNavigator();

const StaffNavigator = () => {
    return (
            <Tab.Navigator
                barStyle={{ backgroundColor: '#675D50' }}
                activeColor="#675D50"
                shifting={true}
                labeled={false}
                inactiveColor="#F3DEBA">
                <Tab.Screen
                    name="StaffHome"
                    component={StaffHomeScreen}

                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="home" color={color} size={26} />
                        ),
                    }}/>
                <Tab.Screen
                    name="StaffPos"
                    component={StaffPosScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="cart" color={color} size={26} />
                        ),
                    }}/>
                <Tab.Screen
                    name="Stocks"
                    component={StaffStockScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="finance" color={color} size={26} />
                        ),
                    }}/>
                <Tab.Screen
                    name="Profile"
                    component={StaffProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="account" color={color} size={26} />
                        ),
                    }}/>
            </Tab.Navigator>
    );
};

export default StaffNavigator;
