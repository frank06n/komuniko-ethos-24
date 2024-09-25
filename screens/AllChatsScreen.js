import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Avatar, List, Text, FAB, Menu, IconButton } from 'react-native-paper';
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
        onPress={() => navigation.navigate('Chat', {
            type: item.type,
            unique_id: item.unique_id,
            currUserId: currUserId,
            displayname: item.displayname,
            profilepic: item.profilepic
        })}
    />
};





const AllChatsScreen = ({ navigation }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [filteredData, setFilteredData] = useState(currChats);

    const handleSearch = (text) => {
        setSearchQuery(text);

        // Filter data based on the search input
        const filteredList = currChats.filter((item) =>
            item.displayname.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredData(filteredList);
    };

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                        icon={searchBarVisible ? "menu-up-outline" : "magnify-expand"}
                        size={24}
                        style={{ margin: 0 }}
                        onPress={() => setSearchBarVisible(!searchBarVisible)}
                    />
                    <Menu
                        visible={menuVisible}
                        onDismiss={closeMenu}
                        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
                        anchorPosition='bottom'
                    >
                        <Menu.Item onPress={() => { /* Handle option 1 */ }} title="Edit Profile" />
                        <Menu.Item onPress={() => { /* Handle option 2 */ }} title="Settings" />
                        <Menu.Item onPress={() => { /* Handle option 3 */ }} title="Log out" />
                    </Menu>
                </View>

            ),
        });
    }, [navigation, menuVisible, searchBarVisible]);



    return (
        <View style={styles.container}>
            {searchBarVisible && <TextInput
                style={styles.input}
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Type a message"
            />}
            <FlatList
                data={filteredData}
                keyExtractor={item => item.unique_id}
                renderItem={({ item }) => renderListItem(item, navigation)}
            />
            <FAB
                icon="chat-plus-outline"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
            />
        </View>

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
    listItem: { paddingLeft: 16 },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },

    input: { margin: 10, backgroundColor: 'white', padding: 8, borderRadius: 5 },
});


export default AllChatsScreen;
