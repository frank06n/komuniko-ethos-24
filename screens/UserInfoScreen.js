import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth, db } from '../config/firebase';// Ensure this is correctly exporting your initialized db
import { ref, onValue } from 'firebase/database';
import { SubmitData } from '../utils/firebaseHelper';

const UserInfoScreen = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const getRefPath = (user) => {
        return `users/${user.uid}`;
    }

    const onRetrieveData = (data) => {
        if (data) {
            setUsername(data.username || '');
            setName(data.name || '');
            setBio(data.bio || '');
        }
        else {
            console.log('data is undefined/null');
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userRef = ref(db, getRefPath(user));

                // Retrieve user info when the component mounts
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    onRetrieveData(data);
                }, onError);
            } else {
                onError('User not signed in');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const handleSubmit = async () => {
        console.log('function called');
        await SubmitData(username, name, bio,
            success => Alert.alert('Success', success),
            error => Alert.alert('Error', error));
        console.log('submit data done');
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
