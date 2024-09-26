import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Avatar, List, Button } from 'react-native-paper';
import { getChatsList } from '../test_util/ProvideData';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const AllChatsScreen = ({ navigation }) => {

    const Logout = () => {
        signOut(auth)
            .then(() => navigation.replace('Login'))
            .catch((error) => Alert.alert('Logout error', error));
    };

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('UserInfo')}
                style={styles.userInfoButton}
            >
                User Info
            </Button>
            <FlatList
                style={styles.chatsList}
                data={getChatsList()}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.name}
                        description={item.lastMessage}
                        left={() => <Avatar.Image size={48} source={{ uri: item.avatar }} />}
                        onPress={() => navigation.navigate('Chat', { name: item.name })}
                    />
                )}
            />
            <Button
                mode="contained" // Add this line
                onPress={Logout} // Use the existing function for logout
                style={styles.logoutButton} // Optional: Add custom styles for logout button
            >
                Logout
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between' // Ensures the FlatList and button are spaced apart
    },
    userInfoButton: {
        margin: 16,
    },
    chatsList: {
        paddingHorizontal: 16
    }
});

export default AllChatsScreen;
