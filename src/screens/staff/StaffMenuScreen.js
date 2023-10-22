import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const StaffMenuScreen = () => {
    return (
        <View style={styles.container}>
            <Text>MENU</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ABC4AA', // Adjust to your background color
    },
});

export default StaffMenuScreen;
