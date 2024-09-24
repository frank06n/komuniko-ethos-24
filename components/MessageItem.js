import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
// import moment from 'moment'; // For formatting timestamps


const getDisplayTime = timestamp => {
    const date = new Date(timestamp);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return h + ':' + m;
}


const MessageItem = ({ message, isGroup, currentUser, users }) => {
    const { message_id, text_content, sender, timestamp } = message;
    const isCurrentUser = sender === currentUser;
    const senderInfo = users[sender]; // Assuming users contain an array with user info
    // const theme = useTheme(); // Use theme for colors if needed

    return (
        <View style={[
            styles.container,
            isCurrentUser ? styles.myMessageContainer : styles.otherMessageContainer
        ]}>
            {!isCurrentUser && isGroup && (
                <Avatar.Image style={styles.avatar} size={32} source={{ uri: senderInfo.profilepic }} />
            )}

            <View style={[
                styles.messageBubble,
                isCurrentUser ? styles.myMessage : styles.otherMessage
            ]}>
                {!isCurrentUser && isGroup && (
                    <Text style={styles.username}>{senderInfo.username}</Text>
                )}
                <Text style={styles.messageText}>{text_content}</Text>
                {/* <Text style={styles.timestamp}>{moment(timestamp).fromNow()}</Text> */}
                <Text style={styles.timestamp}>{getDisplayTime(timestamp)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8,
        paddingHorizontal: 8,
    },
    avatar: {
        marginRight: 6
    },
    myMessageContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    otherMessageContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    messageBubble: {
        maxWidth: '70%',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 6,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 1,
    },
    myMessage: {
        backgroundColor: '#007AFF',
        borderTopRightRadius: 0,
    },
    otherMessage: {
        backgroundColor: '#B5B5BA',
        borderTopLeftRadius: 0,
    },
    messageText: {
        color: 'white',
    },
    username: {
        fontSize: 12,
        color: 'black',
        marginBottom: 4,
    },
    timestamp: {
        marginBottom: 2,
        fontSize: 10,
        color: 'black',
        textAlign: 'right',
    },
});

export default MessageItem;
