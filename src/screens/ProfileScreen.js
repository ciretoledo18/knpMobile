import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Linking,
} from 'react-native';
import {fetchCustomers, fetchUsers} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultAvatar from '../assets/avatar.gif';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const openLink = (url) => {
        Linking.openURL(url).catch((err) =>
            console.error('Error opening URL:', err)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = parseInt(
                    await AsyncStorage.getItem('userId'),
                    10
                );

                const allUsers = await fetchUsers();
                const allCustomers = await fetchCustomers();

                const currentUser = allUsers.find((user) => user.id === userId);
                const currentCustomer = allCustomers.find(
                    (customer) => customer.user_id === userId
                );

                setCustomerData(currentCustomer);
                setUserData(currentUser);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 20000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const handleSignOut = () => {
        navigation.replace('Login');
    };

    const handleEditProfile = () => {
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
                    <View style={styles.cover}>
                        {/* Icons Section */}
                        <View style={styles.iconsContainer}>
                            {/* Website */}
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                    openLink('https://www.kapenapud.com')
                                }
                            >
                                <Icon
                                    name="globe"
                                    size={30}
                                    color="#E15D44"
                                />
                            </TouchableOpacity>

                            {/* Facebook */}
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                    openLink(
                                        'https://www.facebook.com/kapenapud'
                                    )
                                }
                            >
                                <Icon
                                    name="facebook"
                                    size={30}
                                    color="#1877F2"
                                />
                            </TouchableOpacity>

                            {/* TikTok */}
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                    openLink(
                                        'https://www.tiktok.com/@kapenapud'
                                    )
                                }
                            >
                                <Icon
                                    name="tiktok"
                                    size={30}
                                    color="#69C9D0"
                                />
                            </TouchableOpacity>

                            {/* Instagram */}
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                    openLink(
                                        'https://www.instagram.com/kapenapud'
                                    )
                                }
                            >
                                <Icon
                                    name="instagram"
                                    size={30}
                                    color="#E4405F"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        {customerData ? (
                            // If customerData is available
                            <>
                                <Image
                                    style={styles.avatar}
                                    source={
                                        customerData.avatar
                                            ? {uri: `https://kapenapud.com/storage/${customerData.avatar}`}
                                            : defaultAvatar
                                    }
                                />
                                <Text style={styles.userName}>
                                    {userData.name}
                                </Text>
                                <Text style={styles.userInfo}>
                                    {userData.email}
                                </Text>
                                <Text style={styles.userInfo}>
                                    Rewards: {customerData.rewards}
                                </Text>
                                {/* Additional customerData fields */}
                                {/* ... */}
                            </>
                        ) : (
                            // If customerData is not available
                            <>
                                <Text style={styles.userName}>
                                    {userData.name}
                                </Text>
                                <Text style={styles.userInfo}>
                                    {userData.email}
                                </Text>
                                {/* Additional customerData fields */}
                                {/* ... */}
                                <Text style={styles.userInfo}>
                                    Update your profile.
                                </Text>
                            </>
                        )}
                        {/*<TouchableOpacity*/}
                        {/*    style={styles.editProfileButton}*/}
                        {/*    onPress={handleEditProfile}*/}
                        {/*>*/}
                        {/*    <Text style={styles.buttonText}>*/}
                        {/*        Edit Profile*/}
                        {/*    </Text>*/}
                        {/*</TouchableOpacity>*/}

                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleSignOut}
                        >
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
        justifyContent: 'center',
        alignItems: 'center',
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
        color: '#675D50',
        textDecorationLine: 'underline',
    },
    userInfo: {
        fontSize: 16,
        marginVertical: 5,
        color: '#675D50',
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    addProfileButton: {
        backgroundColor: '#ABC4AA',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
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
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%', // Adjust as needed
        marginBottom: 20, // Adjust as needed
    },
    iconButton: {
        backgroundColor: '#F2F2F2', // Adjust to your button color
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
    },
    socialText: {
        color: '#675D50',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 1,
    },
});

export default ProfileScreen;
