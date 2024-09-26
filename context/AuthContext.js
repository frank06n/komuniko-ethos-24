import React, { createContext, useState } from 'react';

// Create the Authenticated User Context
export const AuthenticatedUserContext = createContext({});

// AuthenticatedUserProvider to provide auth state to the entire app
export const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser, userProfile, setUserProfile }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};
