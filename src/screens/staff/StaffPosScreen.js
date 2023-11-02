import React from 'react';
import { View, StyleSheet } from 'react-native';
import StaffMenuScreen from './StaffMenuScreen'; // Adjust the path accordingly
import StaffCartScreen from './StaffCartScreen';

const StaffPosScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <StaffMenuScreen />
            </View>
            <View style={styles.rightColumn}>
                <StaffCartScreen />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 1,
    },
});

export default StaffPosScreen;
