import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllChatsScreen from './screens/AllChatsScreen';
import ChatScreen from './screens/ChatScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="AllChats">
                    <Stack.Screen name="AllChats" component={AllChatsScreen} options={{ title: 'Chats' }} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
