import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const navigation = useNavigation();

    const handleSaveProfile = () => {
        // Implement logic to save the edited profile data
        // For now, let's just navigate back to the profile screen
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>Edit Profile</Text>

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contact"
                    value={contact}
                    onChangeText={(text) => setContact(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Birthday"
                    value={birthday}
                    onChangeText={(text) => setBirthday(text)}
                />

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Set your desired background color
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFFFFF', // Set form background color
        borderRadius: 10,
        elevation: 3,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#675D50', // Set header text color
    },
    input: {
        height: 40,
        borderColor: '#D3D3D3', // Set input border color
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#A9907E',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#675D50',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;
