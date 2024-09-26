import { getDatabase, ref, set, get } from "firebase/database"; // Import get for fetching data

// Function to save user information to Firebase Realtime Database
export const saveUserInfo = async (userId, userInfo) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);

    try {
        await set(userRef, userInfo);
        console.log("User information saved successfully.");
    } catch (error) {
        console.error("Error saving user information:", error);
    }
};

// Function to retrieve user information from Firebase Realtime Database
export const getUserInfo = async (userId) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user information:", error);
        return null;
    }
};
