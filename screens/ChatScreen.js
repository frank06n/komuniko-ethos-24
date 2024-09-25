import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { Avatar, Button, Menu, IconButton } from 'react-native-paper';
import { getGroupChat, getPersonalChatPair, getUserData } from '../test_util/ProvideData';
import MessageItem from '../components/MessageItem';

const ChatScreen = ({ navigation, route }) => {
    const { type, unique_id, currUserId, displayname, profilepic } = route.params;

    const isGroup = type === 'GROUP';
    const chatData = isGroup ? getGroupChat(unique_id) : getPersonalChatPair(unique_id);

    const usersData = {}
    if (isGroup) {
        for (let id of chatData.users) {
            usersData[id] = getUserData(id);
        }
    }
    const [messages, setMessages] = useState([...chatData.messages].reverse() || []);
    const [newMessage, setNewMessage] = useState('');



    const lastMessageId = messages[0].message_id;

    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: displayname,
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        style={{ margin: 0 }}
                        onPress={() => navigation.goBack()}
                    />
                    <Avatar.Image
                        size={40}
                        source={{ uri: profilepic }} // Replace with your avatar URL
                    />
                </View>
            ),
            headerRight: () => (
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
                    anchorPosition='bottom'
                >
                    <Menu.Item onPress={() => { /* Handle option 1 */ }} title="Option 1" />
                    <Menu.Item onPress={() => { /* Handle option 2 */ }} title="Option 2" />
                    <Menu.Item onPress={() => { /* Handle option 3 */ }} title="Option 3" />
                </Menu>
            ),
        });
    }, [navigation, menuVisible]);

    const flatListRef = useRef(null);

    const sendMessage = () => {
        setMessages([{
            "message_id": lastMessageId + 1,
            "text_content": newMessage,
            "sender": currUserId,
            "timestamp": new Date().toISOString()
        }, ...messages]);

        setNewMessage('');
    };


    return (
        <View style={styles.container}>
            <FlatList
                inverted
                data={messages}
                keyExtractor={msg => msg.message_id}
                ref={flatListRef}
                renderItem={({ item }) => <MessageItem message={item} isGroup={isGroup} currentUser={currUserId} users={usersData} />}
                onContentSizeChange={() => flatListRef.current.scrollToIndex({ index: 0, animated: true })}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                />
                <Button onPress={sendMessage} mode="contained" disabled={!newMessage}>
                    Send
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between' },
    messagesContainer: { flex: 1 },
    myMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6', padding: 10, borderRadius: 10, marginVertical: 5 },
    otherMessage: { alignSelf: 'flex-start', backgroundColor: '#ECECEC', padding: 10, borderRadius: 10, marginVertical: 5 },
    inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#DDD' },
    input: { flex: 1, marginRight: 10, backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 5 },

    senderName: {
        fontWeight: 'bold',
        marginBottom: 2,
    }
});


export default ChatScreen;