import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, BackHandler } from 'react-native';
import { Avatar, Button, Menu, IconButton, Text } from 'react-native-paper';
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

    const [selectedItems, setSelectedItems] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false); // Track if selection mode is active

    // Toggle item selection
    const handleMessageLongPress = (msg) => {
        const m_id = msg.message_id;
        setIsSelecting(true);

        toggleSelectMessage(msg);
    };
    const handleMessagePress = (msg) => {
        if (!isSelecting) return;
        toggleSelectMessage(msg);
    };
    const toggleSelectMessage = (msg) => {
        const m_id = msg.message_id;
        if (selectedItems.length === 1 && selectedItems[0] === m_id) {
            clearSelection();
            return;
        }
        setSelectedItems((prev) =>
            prev.includes(m_id)
                ? prev.filter((id) => id !== m_id)
                : [...prev, m_id]
        );
    }

    // Reset selection
    const clearSelection = () => {
        setIsSelecting(false);
        setSelectedItems([]);
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                if (isSelecting) {
                    clearSelection();
                    return true;
                }
                return false;
            },
        );
        return () => backHandler.remove();
    }, [isSelecting]);


    // Update header options dynamically
    useLayoutEffect(() => {
        if (isSelecting) {
            navigation.setOptions({
                title: '',
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            icon="delete-outline"
                            size={24}
                            style={{ margin: 0, marginRight: 2 }}
                            onPress={() => console.log('delete')}
                        />

                        <IconButton
                            icon="pencil-outline"
                            size={24}
                            style={{ margin: 0, marginRight: 2 }}
                            onPress={() => console.log('edit')}
                        />
                        <IconButton
                            icon="share-variant-outline"
                            size={24}
                            style={{ margin: 0, marginRight: 2 }}
                            onPress={() => console.log('share')}
                        />
                        <IconButton
                            icon="information-outline"
                            size={24}
                            style={{ margin: 0, marginRight: 12 }}
                            onPress={() => console.log('info')}
                        />
                    </View>
                ),
                headerLeft: () => (
                    <IconButton
                        icon="close"
                        size={28}
                        style={{ margin: 0, marginLeft: 10, paddingRight: 5 }}
                        onPress={clearSelection}
                    />
                ),
            });
        } else {
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
                        {!isGroup && (
                            <Menu.Item onPress={() => { /* Handle option 1 */ }} title="View Profile" />
                        )}
                        {isGroup && (
                            <Menu.Item onPress={() => { /* Handle option 1 */ }} title="Group Details" />
                        )}
                        <Menu.Item onPress={() => { /* Handle option 1 */ }} title="Clear Chat" />
                        {isGroup && (
                            <Menu.Item onPress={() => { /* Handle option 1 */ }} title="Exit Group" />
                        )}
                    </Menu>
                ),
            });
        }
    }, [isSelecting, navigation, menuVisible]);



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
                renderItem={({ item }) =>
                (<MessageItem
                    message={item}
                    isGroup={isGroup}
                    currentUser={currUserId}
                    users={usersData}
                    onPress={() => handleMessagePress(item)}
                    onLongPress={() => handleMessageLongPress(item)}
                    isSelected={selectedItems.includes(item.message_id)} />
                )}
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