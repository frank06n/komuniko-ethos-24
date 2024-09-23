import React, { useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { getChatData } from '../test_util/ProvideData';



const ChatScreen = ({ route }) => {
    const { name } = route.params;
    const [messages, setMessages] = useState(getChatData(name) || []);
    const [newMessage, setNewMessage] = useState('');

    const isGroupChat = ['Family Group', 'Friends Group', 'Work Group'].includes(name);

    const sendMessage = () => {
        setMessages([...messages, { id: String(messages.length + 1), text: newMessage, sender: 'Me' }]);
        setNewMessage('');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((msg) => (
                    <View key={msg.id} style={msg.sender === 'Me' ? styles.myMessage : styles.otherMessage}>
                        {isGroupChat && msg.sender !== 'Me' && <Text style={styles.senderName}>{msg.sender}</Text>}
                        <Text>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>
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
    messagesContainer: { padding: 16, flex: 1 },
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