import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Text, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore, storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const ViewProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [editingUsername, setEditingUsername] = useState(false); // Toggle TextInput
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const user = auth.currentUser;
    const userDocRef = doc(firestore, 'users', user.uid);

    useEffect(() => {
        // Fetch the user's profile from Firestore
        const fetchUserProfile = async () => {
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            setUsername(userData?.username || '');
            setImage(userData?.profilePic || null);
        };

        fetchUserProfile();
    }, []);
    // Function to pick a new image from the device
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri); // Upload immediately after selecting
        }
    };

    // Function to upload the new avatar to Firebase Storage
    const uploadImage = async (uri) => {
        if (uri == null) return null;

        const response = await fetch(uri);
        const blob = await response.blob();

        // Create a reference to the location in Firebase Storage
        const storageRef = ref(storage, `profilePics/${user.uid}`);

        // Upload the image as a blob
        const snapshot = await uploadBytes(storageRef, blob);

        // Get and return the download URL for the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update Firestore with the new profile picture URL
        await updateDoc(userDocRef, {
            profilePic: downloadURL,
        });
        setUploading(false);
    };

    // Function to handle username update
    const handleUpdateUsername = async () => {
        await updateDoc(userDocRef, {
            username: username
        });
        setEditingUsername(false); // Hide the TextInput after saving
    };

    return (
        <View style={styles.container}>
            {/* Profile picture section */}
            <TouchableOpacity onPress={pickImage}>
                {image ? (
                    <Avatar.Image size={120} source={{ uri: image }} style={styles.avatar} />
                ) : (
                    <Avatar.Icon size={120} icon="account" style={styles.avatar} />
                )}
            </TouchableOpacity>

            {/* Username section */}
            {editingUsername ? (
                <TextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                    mode="outlined"
                    style={styles.input}
                    right={<TextInput.Icon icon="check" onPress={handleUpdateUsername} />} // Confirm button
                />
            ) : (
                <TouchableOpacity onPress={() => setEditingUsername(true)}>
                    <Text style={styles.username}>{username || 'Set Username'}</Text>
                </TouchableOpacity>
            )}

            {uploading && <Text>Uploading...</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    avatar: {
        marginBottom: 20,
        backgroundColor: '#eee',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 10,
    },
});

export default ViewProfileScreen;
