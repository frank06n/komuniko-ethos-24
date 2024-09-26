// App.js

import React, { useContext, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config/firebase';

// Screens
import AllChatsScreen from './screens/AllChatsScreen';
import ChatScreen from './screens/ChatScreen';
import UserInfoScreen from "./screens/UserInfoScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

// Import Auth Context
import { AuthenticatedUserProvider, AuthenticatedUserContext } from './context/AuthContext';

// Create Stack Navigator
const Stack = createStackNavigator();

// Stack for Authentication (Login/Signup)
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator>
    );
}

// Stack for Chat screens
function ChatStack() {
    return (
        <Stack.Navigator initialRouteName="AllChats">
            <Stack.Screen name="AllChats" component={AllChatsScreen} options={{ title: 'Chats' }} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        </Stack.Navigator>
    );
}

// Root Navigator to handle auth state and routing
function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (authenticatedUser) => {
            if (authenticatedUser && authenticatedUser.emailVerified) {
                setUser(authenticatedUser);
            } else {
                setUser(null);  // Only set user if email is verified
            }
            setIsLoading(false);
        });

        return unsubscribeAuth;
    }, [setUser]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <ChatStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

// Main App Component with PaperProvider for theming
export default function App() {
    return (
        <PaperProvider>
            <AuthenticatedUserProvider>
                <RootNavigator />
            </AuthenticatedUserProvider>
        </PaperProvider>
    );
}
