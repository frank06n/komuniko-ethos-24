import React, { useState, useLayoutEffect, useCallback, useRef } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Avatar, List, Text, FAB, Menu, IconButton } from 'react-native-paper';
import { getUserData, getPersonalChatPairLastMessage, getGroupChatData } from '../test_util/ProvideData';
import MyDialog from '../components/MyDialog';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const currUserId = 0;
const currUserData = getUserData(currUserId);

const buildPersonalChats = () => {
    return Object.entries(currUserData.personalChats).map(([otherUserId, pairId]) => {
        const dat = getUserData(otherUserId);
        return {
            type: 'SINGLE',
            otherUserId,
            displayname: dat.username,
            profilepic: dat.profilepic,
            unique_id: pairId,
            lastMessage: getPersonalChatPairLastMessage(pairId),
        };
    });
};

const buildGroupChats = () => {
    return currUserData.groupChats.map(groupChatId => {
        const dat = getGroupChatData(groupChatId);
        return {
            type: 'GROUP',
            unique_id: groupChatId,
            displayname: dat.groupName,
            profilepic: dat.profilepic,
            lastMessage: dat.lastMessage,
        };
    });
};

const currChats = [...buildPersonalChats(), ...buildGroupChats()].sort(
    (a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
);

const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const renderListItem = (item, navigation) => {
    const displayTime = formatTime(item.lastMessage.timestamp);
    const displayMessage = currUserId === item.lastMessage.sender
        ? `You: ${item.lastMessage.text_content}`
        : item.lastMessage.text_content;

    return (
        <List.Item
            title={() => (
                <View style={styles.titleContainer}>
                    <Text style={styles.name} numberOfLines={1}>{item.displayname}</Text>
                    <Text style={styles.timestamp}>{displayTime}</Text>
                </View>
            )}
            description={displayMessage}
            descriptionNumberOfLines={1}
            style={styles.listItem}
            left={() => <Avatar.Image size={48} source={{ uri: item.profilepic }} />}
            onPress={() => navigation.navigate('Chat', {
                type: item.type,
                unique_id: item.unique_id,
                currUserId,
                displayname: item.displayname,
                profilepic: item.profilepic,
            })}
        />
    );
};

const AllChatsScreen = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [filteredData, setFilteredData] = useState(currChats);

    const myDialog = useRef(null);

    const renderListItemCallback = useCallback(renderListItem, [filteredData, navigation]);

    const handleSearch = text => {
        setSearchQuery(text);
        const filteredList = currChats.filter(item =>
            item.displayname.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filteredList);
    };

    const toggleSearchBarVisibility = () => {
        if (searchBarVisible) {
            handleSearch('');
        }
        setSearchBarVisible(!searchBarVisible);
    };

    const Logout = () => {
        signOut(auth)
            .then(() => navigation.replace('Login'))
            .catch((error) => Alert.alert('Logout error', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                        icon={searchBarVisible ? 'close' : 'magnify'}
                        size={24}
                        onPress={toggleSearchBarVisibility}
                    />
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchorPosition='bottom'
                        anchor={<IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} />}
                    >
                        <Menu.Item onPress={() => navigation.navigate('UserInfo')} title="Edit Profile" />
                        <Menu.Item onPress={() => { /* Handle Settings */ }} title="Settings" />
                        <Menu.Item onPress={Logout} title="Log out" />
                    </Menu>
                </View>
            ),
        });
    }, [navigation, menuVisible, searchBarVisible]);

    return (
        <View style={styles.container}>
            {searchBarVisible && (
                <TextInput
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholder="Search chats"
                />
            )}
            {filteredData.length > 0 ? (
                <FlatList
                    data={filteredData}
                    keyExtractor={item => item.unique_id}
                    renderItem={({ item }) => renderListItemCallback(item, navigation)}
                />
            ) : (
                <Text style={styles.emptyText}>"{searchQuery}" not found!</Text>
            )}
            <FAB
                icon="chat-plus-outline"
                style={styles.fab}
                onPress={() => myDialog.current.showDialog()}
                accessible={true}
                accessibilityLabel="Start new chat"
            />
            <MyDialog
                ref={myDialog} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1
    },
    timestamp: {
        fontSize: 12,
        color: 'gray'
    },
    listItem: { paddingLeft: 16 },
    emptyText: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 6,
        fontSize: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    input: {
        margin: 10,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 5
    }
});

export default AllChatsScreen;
