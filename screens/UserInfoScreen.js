import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth, db } from '../config/firebase'; // Ensure firebase is properly configured
import { ref, onValue } from 'firebase/database';
import { SubmitData } from '../utils/firebaseHelper';

const UserInfoScreen = () => {
    const [userInfo, setUserInfo] = useState({ username: '', name: '', bio: '' });
    const [loading, setLoading] = useState(false);

    const getRefPath = user => `users/${user.uid}`;

    const onRetrieveData = (data = {}) => {
        setUserInfo({
            username: data.username || '',
            name: data.name || '',
            bio: data.bio || ''
        });
    };

    const onError = (error) => {
        console.error(error.message || error);
        Alert.alert('Error', error.message);
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userRef = ref(db, getRefPath(user));
                onValue(userRef, snapshot => onRetrieveData(snapshot.val()), onError);
            } else {
                onError('User not signed in');
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleSubmit = async () => {
        const { username, name, bio } = userInfo;

        if (!username || !name || !bio) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        setLoading(true);
        await SubmitData(
            username,
            name,
            bio,
            success => {
                Alert.alert('Success', success);
                setLoading(false);
            },
            error => {
                Alert.alert('Error', error);
                setLoading(false);
            }
        );
    };

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={userInfo.username}
                onChangeText={text => setUserInfo({ ...userInfo, username: text })}
            />
            <TextInput
                placeholder="Name"
                value={userInfo.name}
                onChangeText={text => setUserInfo({ ...userInfo, name: text })}
            />
            <TextInput
                placeholder="Bio"
                value={userInfo.bio}
                onChangeText={text => setUserInfo({ ...userInfo, bio: text })}
            />
            <Button title="Submit" onPress={handleSubmit} disabled={loading} />
        </View>
    );
};

export default UserInfoScreen;
