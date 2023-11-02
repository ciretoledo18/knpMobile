import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KioskOrderScreen from "../screens/staff/KioskOrderScreen";
import KioskHomeScreen from "../screens/staff/KioskHomeScreen";

const Tab = createMaterialBottomTabNavigator();

const KioskNavigator = () => {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: '#675D50' }}
            activeColor="#675D50"
            shifting={true}
            labeled={false}
            inactiveColor="#F3DEBA">
            <Tab.Screen
                name="KioskHome"
                component={KioskHomeScreen}

                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}/>
            <Tab.Screen
                name="KioskOrder"
                component={KioskOrderScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="cart" color={color} size={26} />
                    ),
                }}/>
            {/*<Tab.Screen*/}
            {/*    name="Profile"*/}
            {/*    component={StaffProfileScreen}*/}
            {/*    options={{*/}
            {/*        tabBarIcon: ({ color }) => (*/}
            {/*            <Icon name="account" color={color} size={26} />*/}
            {/*        ),*/}
            {/*    }}/>*/}
        </Tab.Navigator>
    );
};

export default KioskNavigator;
