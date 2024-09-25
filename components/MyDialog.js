import React from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, withTheme } from 'react-native-paper';


const createStyles = (theme) => StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginBottom: 24
    },
    button: {
        fontSize: 32,
        alignItems: 'flex-start',
        paddingHorizontal: 32,
    },
    input: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
        borderColor: theme.colors.primary,
        borderWidth: 1,
    }
});

class MyDialog extends React.Component {
    constructor(props) {
        super(props);

        const { theme } = this.props; // Access the theme from props
        this.styles = createStyles(theme);

        this.state = {
            visible: false,
            page: 0,
            username: '',
        };
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.onUsernameTextChanged = this.onUsernameTextChanged.bind(this);
        this.setPage = this.setPage.bind(this);

    }
    showDialog() {
        this.setState({ visible: true });
    }
    hideDialog() {
        this.setState({
            visible: false,
            page: 0,
            username: '',
        });
    }
    onUsernameTextChanged(text) {
        this.setState({ username: text });
    }
    setPage(page_id) {
        this.setState({ page: page_id });
    }

    render() {
        return (
            <Portal>
                <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
                    <Dialog.Title>New Chat</Dialog.Title>
                    {this.state.page == 0 &&
                        (<View style={this.styles.buttonsContainer}>
                            <Button
                                style={this.styles.button}
                                icon="account-search"
                                onPress={() => { this.setPage(1); }}>Person</Button>
                            <Button
                                style={this.styles.button}
                                icon="account-multiple-plus"
                                onPress={() => { this.hideDialog(); }}>Create Group</Button>
                            <Button
                                style={this.styles.button}
                                icon="account-group"
                                onPress={() => { this.hideDialog(); }}>Join Group</Button>
                        </View>)
                    }
                    {this.state.page == 1 &&
                        (<Dialog.Content>
                            <TextInput
                                style={this.styles.input}
                                placeholder="Enter username"
                                value={this.state.username}
                                onChangeText={this.onUsernameTextChanged}
                            />
                        </Dialog.Content>)
                    }
                    {this.state.page == 1 &&
                        (<Dialog.Actions>
                            <Button onPress={this.hideDialog}>Go</Button>
                            <Button onPress={this.hideDialog}>Cancel</Button>
                        </Dialog.Actions>)
                    }
                </Dialog>
            </Portal>
        );
    }
}

export default withTheme(MyDialog);