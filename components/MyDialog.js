import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput, withTheme } from 'react-native-paper';


const createStyles = (theme) => StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginBottom: 24
    },
    button: {
        alignItems: 'flex-start',
        paddingHorizontal: 32,
    },
    input: {
        backgroundColor: 'transparent'
    },
    foundText: {
        color: theme.colors.primary,
        padding: 4,
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
            usernameFound: false,
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
            usernameFound: false,
        });
    }
    onUsernameTextChanged(text) {
        const found = text.toLowerCase() === 'shiela';
        this.setState({ username: text, usernameFound: found });
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
                                mode={'outlined'}
                                label="Enter username"
                                value={this.state.username}
                                onChangeText={this.onUsernameTextChanged}

                            />
                            {this.state.usernameFound &&
                                <Text style={this.styles.foundText}>User found!</Text>
                            }
                        </Dialog.Content>)
                    }
                    {this.state.page == 1 &&
                        (<Dialog.Actions>
                            <Button onPress={this.hideDialog} disabled={!this.state.usernameFound}>Go</Button>
                            <Button onPress={this.hideDialog}>Cancel</Button>
                        </Dialog.Actions>)
                    }
                </Dialog>
            </Portal>
        );
    }
}

export default withTheme(MyDialog);