// This file should not be run or imported.
throw new Error("This file is not meant to be executed or imported."); 1 + 1;


users = {
    0: 'rahul@..',
    1: 'abby@..',
    2: 'siko@..',
    3: 'poppy@..',
    4: 'sinha@..',
};

usersData = {
    0: {
        email: 'rahul@..',
        username: 'rahul356',
        profilepic: 'url', // Encrypt only if sensitive data, otherwise, use HTTPS.
        personalChats: {
            1: 12563, // user_id: pair_id
        },
        groupChats: [1151],
    },
    1: { /*...*/ },
    2: { /*...*/ },
    3: { /*...*/ },
    4: { /*...*/ },
};

personalChatPairs = {
    // pair_id: data of messages between two people
    12563: {
        users: [0, 1],
        messages: [
            // messages go here
        ],
    },
};

groupChats = {
    1151: {
        groupName: 'Friends Group',
        users: [0, 2, 3],
        admins: [0], // List of user_ids
        messages: [
            // message format
        ],
    },
};

// Message format
m = {
    message_id: 1, // Unique ID for each message
    text_content: 'Hey!',
    sender: 0, // user_id of the sender
    timestamp: '2024-09-23T18:00:00Z',
    media_content: '', // Could be a URL or file reference for attachments
    reply_for_id: null, // message_id of the replied message
    reply_for_content_short: '', // A preview of the original message being replied to
};


// Feedback from my guy ChatGPT
/*
    Encrypting profile pictures is possible, but it might not be necessary unless privacy is a key concern for your app. Instead of encrypting the URL, you might consider securing the images themselves during upload (e.g., using HTTPS or storing them on encrypted storage)
    However, if encryption is needed for sensitive data like usernames or emails, it's more common to encrypt these pieces of information rather than static resources like profile pictures.

    You can add a message_id to each message for easy referencing when you implement replies or forwards later.
    For media_content, consider defining the type of media (e.g., image, video, file) and provide metadata like the size or thumbnail for larger media.
    
    For admins, adding permissions like "can_add_users", "can_remove_users" might be useful for role-based access control.
    In the message structure, reply_for_id and reply_for_content_short are a good start. You might also want to reference the entire message object being replied to instead of just its id and a short snippet.
 */