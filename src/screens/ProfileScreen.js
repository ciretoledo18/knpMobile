import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { fetchCustomers, fetchUsers } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = parseInt(await AsyncStorage.getItem('userId'), 10);

                const allUsers = await fetchUsers();
                const allCustomers = await fetchCustomers();

                const currentUser = allUsers.find(user => user.id === userId);
                const currentCustomer = allCustomers.find(customer => customer.user_id === userId);

                setCustomerData(currentCustomer);
                setUserData(currentUser);

            } catch (error) {
                console.error('Error fetching user data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSignOut = () => {
        // Implement your sign-out logic here
        // For now, let's navigate back to the login screen
        navigation.replace('Login');
    };

    const handleEditProfile = () => {
        // Navigate to EditProfileScreen
        navigation.navigate('EditProfile');
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Image
                        source={require('../assets/icon.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <View style={styles.profileContainer}>
                    <View style={styles.cover} />
                    <View style={styles.contentContainer}>
                        <Image style={styles.avatar} source={{ uri: `https://kapenapud.com/storage/${customerData.avatar}` }} />
                        <Text style={styles.userName}>{userData.name}</Text>
                        <Text style={styles.userInfo}>User ID: {userData.id}</Text>
                        <Text style={styles.userInfo}>Email: {userData.email}</Text>
                        <Text style={styles.userInfo}>Name: {customerData.first_name} {customerData.last_name}</Text>
                        <Text style={styles.userInfo}>Gender: {customerData.gender}</Text>
                        <Text style={styles.userInfo}>Birthday: {customerData.birthday}</Text>
                        <Text style={styles.userInfo}>Contact: {customerData.contact_no}</Text>
                        <Text style={styles.userInfo}>Rewards: {customerData.rewards}</Text>

                        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
    },
    cover: {
        width: '100%',
        height: 150,
        backgroundColor: '#ABC4AA',
    },
    contentContainer: {
        alignItems: 'center',
        marginTop: -50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    userInfo: {
        fontSize: 16,
        marginVertical: 5,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: '#FFF',
    },
    editProfileButton: {
        backgroundColor: '#ABC4AA',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    logoutButton: {
        backgroundColor: '#675D50',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
