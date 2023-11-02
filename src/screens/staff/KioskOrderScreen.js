import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import StaffMenuScreen from './StaffMenuScreen'; // Adjust the path accordingly
import KioskCartScreen from "./KioskCartScreen"; // Adjust the path accordingly

const KioskOrderScreen = () => {
    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.leftColumn}>
                    <StaffMenuScreen />
                </View>
                <View style={styles.rightColumn}>
                    <KioskCartScreen />
                </View>
            </SafeAreaView>
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

export default KioskOrderScreen;
