import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../config/firebase'; // Ensure this is correctly exporting your initialized db

const UserInfoScreen = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userId = user.uid; // Get the current user ID
                const userRef = ref(db, `users/${userId}`);
                
                // Retrieve user info when the component mounts
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log("Retrieved user data:", data); // Debug log
                    if (data) {
                        setUsername(data.username || '');
                        setName(data.name || '');
                        setBio(data.bio || '');
                    }
                }, (error) => {
                    console.error("Error retrieving user info:", error);
                });
            } else {
                console.log("No user is currently signed in.");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const handleSubmit = async () => {
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid; // Get the current user ID
            const userInfo = {
                username,
                name,
                bio,
            };

            console.log("Saving user info:", userInfo); // Debug log
            await saveUserInfo(userId, userInfo);
            Alert.alert('Success', 'Your information has been saved!');
        } else {
            Alert.alert('Error', 'You must be logged in to save your information.');
        }
    };

    const saveUserInfo = async (userId, userInfo) => {
        try {
            // Ensure db is correctly initialized
            if (!db) {
                console.error("Database is not initialized.");
                return;
            }

            // Save user info to the database
            await set(ref(db, `users/${userId}`), userInfo);
            console.log("User info saved successfully.");
        } catch (error) {
            console.error("Error saving user info:", error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default UserInfoScreen;
