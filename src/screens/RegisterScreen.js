import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleRegister = async () => {
        try {
            // Make a request to register the user
            const response = await axios.post('https://kapenapud.com/api/auth/register', {
                name,
                email,
                password,
            });

            // Assuming the registration was successful
            if (response.status === 200) {
                // Display the popup
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            // Handle registration error (display an error message, etc.)
        }
    };

    const navigateToLogin = () => {
        // Navigate to the Login screen
        navigation.navigate('Login');
    };

    return (
        <View style={styles.bgContainer}>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showPopup}
                    onRequestClose={() => {
                        setShowPopup(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Welcome! Registration successful.</Text>
                            <TouchableOpacity style={styles.popupButton} onPress={() => setShowPopup(false)}>
                                <Text style={styles.popupButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/icon.png')} />
                    <Text style={styles.logoText}>kape na pud</Text>
                </TouchableOpacity>
                <View style={styles.formContainer}>
                    <View style={styles.formContent}>
                        <Text style={styles.title}>Create an account</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <TouchableOpacity style={styles.createAccountButton} onPress={handleRegister}>
                            <Text style={styles.createAccountButtonText}>Create an account</Text>
                        </TouchableOpacity>
                        <Text style={styles.signInText}>
                            Already have an account?{' '}
                            <Text style={styles.signInLink} onPress={navigateToLogin}>Login here</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        backgroundColor: '#ABC4AA',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    logo: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    formContent: {
        padding: 16,
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        marginTop: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    input: {
        backgroundColor: '#f8f8f8',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
    },
    createAccountButton: {
        backgroundColor: '#A9907E',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    createAccountButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInText: {
        marginTop: 16,
        fontSize: 14,
        color: '#666',
    },
    signInLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    // Styles for the popup
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    popupButton: {
        backgroundColor: '#ABC4AA',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        width: 100,
    },
    popupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
