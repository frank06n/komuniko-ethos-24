import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, BackHandler } from 'react-native';
import { Button } from 'react-native-paper';
import { getGroupChat, getPersonalChatPair, getUserData } from '../test_util/ProvideData';
import MessageItem from '../components/MessageItem';
import { DefaultHeaderLeft, DefaultHeaderRight, SelectionHeaderLeft, SelectionHeaderRight } from '../components/ChatScreenHeader';


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
    const [selectedItems, setSelectedItems] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);

    const lastMessageId = messages[0]?.message_id || 0;
    const flatListRef = useRef(null);


    // Back handler to clear selection mode
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isSelecting) {
                clearSelection();
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, [isSelecting]);


    // Update header options dynamically
    useLayoutEffect(() => {
        navigation.setOptions(isSelecting ? {
            title: '',
            headerLeft: () => <SelectionHeaderLeft clearSelection={clearSelection} />,
            headerRight: () => <SelectionHeaderRight />
        } : {
            title: displayname,
            headerLeft: () => <DefaultHeaderLeft navigation={navigation} profilepic={profilepic} />,
            headerRight: () => <DefaultHeaderRight isGroup={isGroup} />
        });
    }, [isSelecting, navigation]);


    // Selection handlers
    const toggleSelectMessage = (msg) => {
        const m_id = msg.message_id;
        if (selectedItems[0] === m_id) {
            clearSelection();
            return;
        }
        setSelectedItems((prev) =>
            prev.includes(m_id) ? prev.filter(id => id !== m_id) : [...prev, m_id]
        );
    };
    const clearSelection = () => {
        setIsSelecting(false);
        setSelectedItems([]);
    };
    const handleMessageLongPress = (msg) => {
        setIsSelecting(true);
        toggleSelectMessage(msg);
    };
    const handleMessagePress = (msg) => {
        if (isSelecting) toggleSelectMessage(msg);
    };


    const sendMessage = () => {
        setMessages([{
            message_id: lastMessageId + 1,
            text_content: newMessage,
            sender: currUserId,
            timestamp: new Date().toISOString()
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
                renderItem={({ item }) => (
                    <MessageItem
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
    inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#DDD' },
    input: { flex: 1, marginRight: 10, backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 5 },
});


export default ChatScreen;