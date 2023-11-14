import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const QRScannerScreen = ({ navigation, onClose }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ data }) => {
        if (isScanning) {
            setIsScanning(false);

            // Assuming the QR code data contains the reward ID
            const rewardId = data;

            // Send a PATCH request to kapenapud.com/api/rewards/${rewardId}
            try {
                const response = await axios.patch(`https://kapenapud.com/api/rewards/${rewardId}`);
                // Handle the response if needed
                console.log('PATCH request successful:', response.data);
            } catch (error) {
                // Handle error
                console.error('Error making PATCH request:', error);
            } finally {
                // Close the camera screen after scanning
                onClose && onClose();
                // Navigate back to the home screen
                navigation.navigate('StaffNav');
            }
        }
    };

    const handleClose = () => {
        // Close the camera screen
        onClose && onClose();
        // Navigate back to the home screen
        navigation.navigate('StaffNav');
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} onBarCodeScanned={handleBarCodeScanned}>
                <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>QR Scanner</Text>
                    {/* Close button */}
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Text style={{ color: 'white' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        bottom: 16,
        backgroundColor: '#675D50',
        borderRadius: 8,
        padding: 12,
    },
});

export default QRScannerScreen;
