import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Avatar, List, Text } from 'react-native-paper';
import { getUserData, getPersonalChatPairLastMessage, getGroupChatData } from '../test_util/ProvideData';

const currUserId = 0;
const currUserData = getUserData(currUserId);
const currChats = [];

for (const otherUserId in currUserData.personalChats) {
    const dat = getUserData(otherUserId);
    const pairId = currUserData.personalChats[otherUserId];

    currChats.push({
        type: 'SINGLE',
        otherUserId: otherUserId,
        displayname: dat.username,
        profilepic: dat.profilepic,
        unique_id: pairId,
        lastMessage: getPersonalChatPairLastMessage(pairId)
    });
}
for (const groupChatId of currUserData.groupChats) {
    const dat = getGroupChatData(groupChatId);

    currChats.push({
        type: 'GROUP',
        unique_id: groupChatId,
        displayname: dat.groupName,
        profilepic: dat.profilepic,
        lastMessage: dat.lastMessage
    });
}

const t = a => new Date(a.lastMessage.timestamp).getTime();
currChats.sort((a, b) => t(a) - t(b));


const getDisplayTime = timestamp => {
    const date = new Date(timestamp);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return h + ':' + m;
}

const renderListItem = (item, navigation) => {

    const displayTime = getDisplayTime(item.lastMessage.timestamp);
    let displayMessage = item.lastMessage.text_content;
    if (currUserId == item.lastMessage.sender)
        displayMessage = 'You: ' + displayMessage;

    return <List.Item
        title={() => (
            <View style={styles.titleContainer}>
                <Text style={styles.name} numberOfLines={1}>{item.displayname}</Text>
                <Text style={styles.timestamp}>{displayTime}</Text>
            </View>
        )}
        description={displayMessage}
        descriptionNumberOfLines={1} // Truncate to 1 line
        style={styles.listItem}
        left={() => <Avatar.Image size={48} source={{ uri: item.profilepic }} />}
        onPress={() => navigation.navigate('Chat', { type: item.type, unique_id: item.unique_id })}
    />
};

const AllChatsScreen = ({ navigation }) => {
    return (
        <FlatList
            style={styles.chatsList}
            data={currChats}
            keyExtractor={item => item.unique_id}
            renderItem={({ item }) => renderListItem(item, navigation)}
        />
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between' },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
    },
    timestamp: {
        fontSize: 12,
        color: 'gray',
    },
    listItem: { paddingLeft: 16 }
});


export default AllChatsScreen;
