import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Adjust the import based on your icon library

const HomeScreen = () => {
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>drink another cup, stay for good food, connect with people
            </Text>

            <View style={styles.iconContainer}>
                {/* Website */}
                <TouchableOpacity style={styles.iconButton} onPress={() => openLink('https://www.kapenapud.com')}>
                    <Icon name="globe" size={30} color="#E15D44" />
                </TouchableOpacity>

                {/* Facebook */}
                <TouchableOpacity style={styles.iconButton} onPress={() => openLink('https://www.facebook.com/kapenapud')}>
                    <Icon name="facebook" size={30} color="#1877F2" />
                </TouchableOpacity>

                {/* TikTok */}
                <TouchableOpacity style={styles.iconButton} onPress={() => openLink('https://www.tiktok.com/@kapenapud')}>
                    <Icon name="tiktok" size={30} color="#69C9D0" />
                </TouchableOpacity>

                {/* Instagram */}
                <TouchableOpacity style={styles.iconButton} onPress={() => openLink('https://www.instagram.com/kapenapud')}>
                    <Icon name="instagram" size={30} color="#E4405F" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Adjust to your background color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",
        padding: 20
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%', // Adjust as needed
    },
    iconButton: {
        backgroundColor: '#F2F2F2', // Adjust to your button color
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
    },
});

export default HomeScreen;
