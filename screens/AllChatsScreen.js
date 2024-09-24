import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Avatar, List, Text } from 'react-native-paper';
import { getChatsList } from '../test_util/ProvideData';

import { Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

// const AllChatsScreen = ({ navigation }) => {
//     return (
//         <FlatList
//             style={styles.chatsList}
//             data={getChatsList()}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => (
//                 <List.Item
//                     title={item.name}
//                     description={item.lastMessage}
//                     left={() => <Avatar.Image size={48} source={{ uri: item.avatar }} />}
//                     onPress={() => navigation.navigate('Chat', { name: item.name })}
//                 />
//             )}
//         />
//     );
// };


const AllChatsScreen = ({ navigation }) => {
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out');
                navigation.replace('Login'); // Redirect to Login screen after logout
            })
            .catch((error) => console.log('Logout error', error));
    };

    return (
        <View style={styles.container}>
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
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'space-between' // Ensures the FlatList and button are spaced apart
    },
    chatsList: { 
        paddingHorizontal: 16 
    }
});



export default AllChatsScreen;
