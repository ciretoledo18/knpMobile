import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {loginUser} from '../utils/api';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const token = await loginUser(email, password);
            // Do something with the token (e.g., navigate to another screen)
            console.log('Login successful. Token:', token);

            // Navigate to the Home screen
            navigation.replace('Home', {token});
        } catch (error) {
            // Handle login error (display an error message, etc.)
            console.error('Login failed:', error.message);
        }
    };

    const handleRegister = () => {
        // Navigate to the Register screen
        navigation.navigate('Register');
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
                        <Text style={styles.title}>Sign in to your account</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Your email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
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
                        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                            <Text style={styles.signInButtonText}>Sign in</Text>
                        </TouchableOpacity>
                        <Text style={styles.signUpText}>
                            Don’t have an account yet?{' '}
                            <Text style={styles.signUpLink} onPress={handleRegister}>Sign up</Text>
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
        backgroundColor: 'white',
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
        justifyContent: 'space-between',
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
    forgotPassword: {
        fontSize: 14,
        fontWeight: '600',
        color: 'blue',
    },
    signInButton: {
        backgroundColor: '#A9907E',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpText: {
        marginTop: 16,
        fontSize: 14,
        color: '#666',
    },
    signUpLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
