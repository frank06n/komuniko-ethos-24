import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Menu, IconButton } from 'react-native-paper';

export function SelectionHeaderRight() {
    return <View style={{ flexDirection: 'row' }}>
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
    </View>;
}

export function SelectionHeaderLeft({ clearSelection }) {
    return <IconButton
        icon="close"
        size={28}
        style={{ margin: 0, marginLeft: 10, paddingRight: 5 }}
        onPress={clearSelection}
    />;
}

export function DefaultHeaderRight({ isGroup }) {
    const [menuVisible, setMenuVisible] = useState(false);

    const mItem = (condition, title, onPress) =>
        (condition && <Menu.Item title={title} onPress={onPress} />);

    return <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={<IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} />}
        anchorPosition='bottom'
    >
        {mItem(!isGroup, "View Profile", () => console.log("a"))}
        {mItem(isGroup, "Group Details", () => console.log("b"))}
        {mItem(true, "Clear Chat", () => console.log("c"))}
        {mItem(isGroup, "Exit Group", () => console.log("d"))}
    </Menu>;
}

export function DefaultHeaderLeft({ navigation, profilepic }) {
    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    </View>;
}