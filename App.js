import React, { createContext, useState, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllChatsScreen from './screens/AllChatsScreen';
import ChatScreen from './screens/ChatScreen';
import { Provider as PaperProvider } from 'react-native-paper';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config/firebase';

import Login from "./screens/Login"; 
import Signup from "./screens/Signup"; 

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AuthStack(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator>
    ); 
}

function ChatStack() {
    return (
        // <PaperProvider>
        //     <NavigationContainer>
                <Stack.Navigator initialRouteName="AllChats">
                    <Stack.Screen name="AllChats" component={AllChatsScreen} options={{ title: 'Chats' }} />
                    <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params.name })} />
                </Stack.Navigator>
        //     </NavigationContainer>
        // </PaperProvider>
    );
}

// function RootNavigator(){
//     const { user, setUser } = useContext(AuthenticatedUserContext);
//     const [isLoading, setIsLoading] = useState(true);
//     return (
//         <NavigationContainer>
//             <AuthStack />
//         </NavigationContainer>
//     )
// }


function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async authenticatedUser => {
                authenticatedUser ? setUser(authenticatedUser) : setUser(null);
                setIsLoading(false);
            }
        );
        return unsubscribeAuth;
    }, [user]);

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




export default function App() {
    return (
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    );
  }






// export default function App() {
//     return (
//         <PaperProvider>
//             <NavigationContainer>
//                 <Stack.Navigator initialRouteName="AllChats">
//                     <Stack.Screen name="AllChats" component={AllChatsScreen} options={{ title: 'Chats' }} />
//                     <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params.name })} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </PaperProvider>
//     );
// }
