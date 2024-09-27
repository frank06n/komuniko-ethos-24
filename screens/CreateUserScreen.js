import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'; // Make sure you have expo-image-picker installed
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { auth, firestore, storage } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthenticatedUserContext } from '../context/AuthContext';

const CreateUserScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const { setUserProfile } = useContext(AuthenticatedUserContext);

    // Function to pick an image from the device
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access gallery is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        else {
            console.log('canceled');
        }
    };

    // Function to upload the image to Firebase Storage
    const uploadImage = async (uid) => {
        if (image == null) return null;

        const response = await fetch(image);
        const blob = await response.blob();

        // Create a reference to the location in Firebase Storage
        const storageRef = ref(storage, `profilePics/${uid}`);

        // Upload the image as a blob
        const snapshot = await uploadBytes(storageRef, blob);

        // Get and return the download URL for the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    };

    // Function to handle submission
    const handleCreateUser = async () => {
        const user = auth.currentUser;
        const uid = user.uid;

        setUploading(true);

        try {
            const imageUrl = await uploadImage(uid); // Upload image to Firebase Storage

            // Create a document reference
            const userDocRef = doc(firestore, "users", uid);
            const profileData = {
                username: username,
                profilePic: imageUrl,
                personalChats: {},
                groupChats: []
            };

            // Set the document with the specified fields
            await setDoc(userDocRef, profileData);
            setUserProfile(profileData);

            // Navigate to the next screen after saving
            navigation.navigate('AllChats'); // Assuming "Home" is your next screen
        } catch (error) {
            console.error("Error creating user: ", error);
        }

        setUploading(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text>Select Profile Picture</Text>
                )}
            </TouchableOpacity>

            <TextInput
                label="Username"
                value={username}
                mode="outlined"
                onChangeText={text => setUsername(text)}
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={handleCreateUser}
                loading={uploading}
                disabled={uploading}
                style={styles.button}
            >
                Create User
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 20,
        borderRadius: 100,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
});

export default CreateUserScreen;
