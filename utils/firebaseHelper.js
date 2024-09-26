import { auth, db } from '../config/firebase';// Ensure this is correctly exporting your initialized db
import { ref, set, onValue } from 'firebase/database';


// export function OnAuthStateChangedGetData(getRefPath, onRetrieveData, onError, onNoUserFound) {
//     return auth.onAuthStateChanged(user => {
//         if (user) {
//             const userRef = ref(db, getRefPath(user));

//             // Retrieve user info when the component mounts
//             onValue(userRef, (snapshot) => {
//                 const data = snapshot.val();
//                 onRetrieveData(data);
//             }, onError);
//         } else {
//             onError('User not signed in');
//         }
//     });
// }


export async function SubmitData(username, name, bio, onSuccess, onError) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const userInfo = {
            username,
            name,
            bio,
        };
        await _saveUserInfo(userId, userInfo, onSuccess, onError);
    } else {
        onError('User not signed in');
    }
};

const _saveUserInfo = async (userId, userInfo, onSuccess, onError) => {
    try {
        if (db) {
            await set(ref(db, `users/${userId}`), userInfo);
            onSuccess('Saved user info');
        }
        else {
            onError("Database is not initialized");
        }
    } catch (error) {
        onError(`Error saving user info: ${error.message}`);
    }
};
