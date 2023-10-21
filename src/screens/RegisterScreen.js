import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            // Make a request to register the user
            const response = await axios.post('https://kapenapud.com/api/auth/register', {
                name,
                email,
                password,
            });

            // Assuming the registration was successful, navigate to the login screen
            navigation.replace('Login');
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
                <TouchableOpacity style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/icon.png')}/>
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
                        <TouchableOpacity style={styles.createAccountButton}>
                            <Text style={styles.createAccountButtonText} onPress={handleRegister}>Create an
                                account</Text>
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
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
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
        shadowOffset: {width: 0, height: 2},
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkboxLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
    termsLink: {
        color: '#007bff',
        fontWeight: 'bold',
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
});

export default RegisterScreen;
