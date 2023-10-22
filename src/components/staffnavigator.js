import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StaffHomeScreen from "../screens/staff/StaffHomeScreen";
import StaffMenuScreen from "../screens/staff/StaffMenuScreen";

const Tab = createMaterialBottomTabNavigator();

const StaffNavigator = () => {
    return (
            <Tab.Navigator
                barStyle={{ backgroundColor: '#FAF8ED' }}
                activeColor="#748E63"
                shifting={true}
                labeled={false}
                inactiveColor="#99B080">
                <Tab.Screen
                    name="StaffHome"
                    component={StaffHomeScreen}

                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="home" color={color} size={26} />
                        ),
                    }}/>
                <Tab.Screen
                    name="StaffMenu"
                    component={StaffMenuScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="food" color={color} size={26} />
                        ),
                    }}/>
                {/*<Tab.Screen*/}
                {/*    name="Cart"*/}
                {/*    component={StaffCartScreen}*/}
                {/*    options={{*/}
                {/*        tabBarIcon: ({ color }) => (*/}
                {/*            <Icon name="cart" color={color} size={26} />*/}
                {/*        ),*/}
                {/*    }}/>*/}
                {/*<Tab.Screen*/}
                {/*    name="Reward"*/}
                {/*    component={StaffRewardScreen}*/}
                {/*    options={{*/}
                {/*        tabBarIcon: ({ color }) => (*/}
                {/*            <Icon name="star" color={color} size={26} />*/}
                {/*        ),*/}
                {/*    }}/>*/}
            </Tab.Navigator>
    );
};

export default StaffNavigator;
