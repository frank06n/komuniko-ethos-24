import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../config/firebase';
import { OnAuthStateChangedGetData, SubmitData } from '../utils/firebaseHelper';

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

    useEffect(() => OnAuthStateChangedGetData(
        getRefPath, onRetrieveData, (error) => Alert.alert('Error', error)
    ), [auth]);

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
