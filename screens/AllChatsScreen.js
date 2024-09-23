import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Avatar, List, Text } from 'react-native-paper';
import { getChatsList } from '../test_util/ProvideData';

const AllChatsScreen = ({ navigation }) => {
    return (
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
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between' },
    chatsList: { paddingHorizontal: 16 }
});


export default AllChatsScreen;
