const users = {
    0: 'rahul.alpha@gmail.com',
    1: 'abby9292@ymail.in',
    2: 'siko.farcos81@hotmail.in',
    3: 'yo.poppy1998@gmail.com',
    4: 'sinhasameer101@gmail.com'
};

const usersData = {
    0: {
        email: 'rahul.alpha@gmail.com',
        username: 'adhikari.rahul',
        profilepic: 'https://picsum.photos/id/0/150',
        personalChats: { 1: 101, 2: 102, 3: 103, 4: 104 },
        groupChats: [1151],
    },
    1: {
        email: 'abby9292@ymail.in',
        username: 'its._abby',
        profilepic: 'https://picsum.photos/id/5/150',
        personalChats: { 0: 101 },
        groupChats: [1151],
    },
    2: {
        email: 'siko.farcos81@hotmail.in',
        username: 'funnyfarcos69',
        profilepic: 'https://picsum.photos/id/183/150',
        personalChats: { 0: 102 },
        groupChats: [1151],
    },
    3: {
        email: 'yo.poppy1998@gmail.com',
        username: 'poppyjude1211',
        profilepic: 'https://picsum.photos/id/91/150',
        personalChats: { 0: 103 },
        groupChats: [1151],
    },
    4: {
        email: 'sinhasameer101@gmail.com',
        username: 'sameer_astic',
        profilepic: 'https://picsum.photos/id/8/150',
        personalChats: { 0: 104 },
        groupChats: [1151],
    },
};

const personalChatPairs = {
    101: {
        users: [0, 1],
        messages: [
            { message_id: 1, text_content: 'Hey! How have you been?', sender: 0, timestamp: '2024-09-23T18:00:00Z' },
            { message_id: 2, text_content: 'I’ve been good, just busy with work. You?', sender: 1, timestamp: '2024-09-23T18:01:00Z' },
            { message_id: 3, text_content: 'Same here! Just trying to keep up with everything.', sender: 0, timestamp: '2024-09-23T18:02:00Z' },
            { message_id: 4, text_content: 'Have you been working on any interesting projects?', sender: 1, timestamp: '2024-09-23T18:03:00Z' },
            { message_id: 5, text_content: 'Yeah, I’m working on a new marketing campaign. It’s pretty exciting!', sender: 0, timestamp: '2024-09-23T18:04:00Z' },
            { message_id: 6, text_content: 'That sounds awesome! What’s the theme?', sender: 1, timestamp: '2024-09-23T18:05:00Z' },
            { message_id: 7, text_content: 'It’s all about sustainability. We’re trying to promote eco-friendly products.', sender: 0, timestamp: '2024-09-23T18:06:00Z' },
            { message_id: 8, text_content: 'Love that! We need more of that in our industry.', sender: 1, timestamp: '2024-09-23T18:07:00Z' },
            { message_id: 9, text_content: 'Totally agree! What about you? What’s keeping you busy?', sender: 0, timestamp: '2024-09-23T18:08:00Z' },
            { message_id: 10, text_content: 'I’m just wrapping up a big project for a client. It’s been a challenge!', sender: 1, timestamp: '2024-09-23T18:09:00Z' },
            { message_id: 11, text_content: 'I can imagine! What’s the project about?', sender: 0, timestamp: '2024-09-23T18:10:00Z' },
            { message_id: 12, text_content: 'It’s a redesign of their website. Lots of moving parts!', sender: 1, timestamp: '2024-09-23T18:11:00Z' },
            { message_id: 13, text_content: 'Sounds like a lot of work! You’ve got this!', sender: 0, timestamp: '2024-09-23T18:12:00Z' },
            { message_id: 14, text_content: 'Thanks! I’ll definitely need your support when it launches.', sender: 1, timestamp: '2024-09-23T18:13:00Z' }
        ],
    },
    102: {
        users: [0, 2],
        messages: [
            { message_id: 1, text_content: 'Did you see the game last night?', sender: 0, timestamp: '2024-09-23T19:00:00Z' },
            { message_id: 2, text_content: 'Yes! It was intense! Can’t believe they pulled it off.', sender: 2, timestamp: '2024-09-23T19:01:00Z' },
            { message_id: 3, text_content: 'Right? I was on the edge of my seat!', sender: 0, timestamp: '2024-09-23T19:02:00Z' },
            { message_id: 4, text_content: 'What was your favorite moment of the game?', sender: 0, timestamp: '2024-09-23T19:03:00Z' },
            { message_id: 5, text_content: 'Definitely the last-minute goal! Unbelievable!', sender: 2, timestamp: '2024-09-23T19:04:00Z' },
            { message_id: 6, text_content: 'I know! I jumped out of my seat!', sender: 0, timestamp: '2024-09-23T19:05:00Z' },
            { message_id: 7, text_content: 'Same here! I was so nervous!', sender: 0, timestamp: '2024-09-23T19:06:00Z' },
            { message_id: 8, text_content: 'Did you catch the interview afterward?', sender: 2, timestamp: '2024-09-23T19:07:00Z' },
            { message_id: 9, text_content: 'Yes! The coach was really proud of the team.', sender: 0, timestamp: '2024-09-23T19:08:00Z' },
            { message_id: 10, text_content: 'I loved how they celebrated together!', sender: 0, timestamp: '2024-09-23T19:09:00Z' },
            { message_id: 11, text_content: 'Do you think they can keep this momentum going?', sender: 2, timestamp: '2024-09-23T19:10:00Z' },
            { message_id: 12, text_content: 'I hope so! They have a tough schedule ahead.', sender: 0, timestamp: '2024-09-23T19:11:00Z' },
            { message_id: 13, text_content: 'Agreed! I’ll be watching closely.', sender: 2, timestamp: '2024-09-23T19:12:00Z' }
        ]
        ,
    },
    103: {
        users: [0, 3],
        messages: [
            { message_id: 1, text_content: 'What’s the plan for the weekend?', sender: 3, timestamp: '2024-09-23T20:00:00Z' },
            { message_id: 2, text_content: 'Thinking of going hiking. Interested?', sender: 0, timestamp: '2024-09-23T20:01:00Z' },
            { message_id: 3, text_content: 'Sounds great! Let’s do it.', sender: 3, timestamp: '2024-09-23T20:02:00Z' },
            { message_id: 4, text_content: 'What time were you thinking of heading out?', sender: 0, timestamp: '2024-09-23T20:05:00Z' },
            { message_id: 5, text_content: 'How about 9 AM? That way we can beat the crowds.', sender: 0, timestamp: '2024-09-23T20:06:00Z' },
            { message_id: 6, text_content: 'Perfect! I’ll bring some snacks.', sender: 3, timestamp: '2024-09-23T20:07:00Z' },
            { message_id: 7, text_content: 'Don’t forget water! It’s going to be warm.', sender: 3, timestamp: '2024-09-23T20:08:00Z' },
            { message_id: 8, text_content: 'Got it! I’ll pack extra just in case.', sender: 0, timestamp: '2024-09-23T20:09:00Z' },
            { message_id: 9, text_content: 'What trail are we taking?', sender: 3, timestamp: '2024-09-23T20:10:00Z' },
            { message_id: 10, text_content: 'I was thinking of the one by the lake. It’s beautiful!', sender: 0, timestamp: '2024-09-23T20:11:00Z' },
            { message_id: 11, text_content: 'Sounds amazing! I can’t wait.', sender: 0, timestamp: '2024-09-23T20:12:00Z' },
            { message_id: 12, text_content: 'Should we invite anyone else?', sender: 3, timestamp: '2024-09-23T20:13:00Z' },
            { message_id: 13, text_content: 'Maybe we can ask Jake. He loves hiking.', sender: 3, timestamp: '2024-09-23T20:14:00Z' },
            { message_id: 14, text_content: 'Good idea! I’ll message him.', sender: 0, timestamp: '2024-09-23T20:15:00Z' }
        ],
    },
    104: {
        users: [0, 4],
        messages: [
            { message_id: 1, text_content: 'Have you watched the new show on Netflix?', sender: 4, timestamp: '2024-09-23T21:00:00Z' },
            { message_id: 2, text_content: 'Not yet! Is it good?', sender: 0, timestamp: '2024-09-23T21:01:00Z' },
            { message_id: 3, text_content: 'Absolutely! You should check it out.', sender: 4, timestamp: '2024-09-23T21:02:00Z' },
            { message_id: 4, text_content: 'What’s it about?', sender: 0, timestamp: '2024-09-23T21:03:00Z' },
            { message_id: 5, text_content: 'It’s a thriller with lots of twists!', sender: 4, timestamp: '2024-09-23T21:04:00Z' },
            { message_id: 6, text_content: 'Sounds intriguing! How many episodes are there?', sender: 0, timestamp: '2024-09-23T21:05:00Z' },
            { message_id: 7, text_content: 'Ten episodes in the first season.', sender: 4, timestamp: '2024-09-23T21:06:00Z' },
            { message_id: 8, text_content: 'Nice! I’ll binge it this weekend.', sender: 0, timestamp: '2024-09-23T21:07:00Z' },
            { message_id: 9, text_content: 'You won’t regret it! The ending is insane.', sender: 4, timestamp: '2024-09-23T21:08:00Z' },
            { message_id: 10, text_content: 'Now I’m even more excited!', sender: 0, timestamp: '2024-09-23T21:09:00Z' },
            { message_id: 11, text_content: 'Let me know what you think after you watch it!', sender: 4, timestamp: '2024-09-23T21:10:00Z' },
            { message_id: 12, text_content: 'Definitely! I’ll text you after.', sender: 0, timestamp: '2024-09-23T21:11:00Z' },
            { message_id: 13, text_content: 'Cool! Can’t wait to hear your thoughts.', sender: 4, timestamp: '2024-09-23T21:12:00Z' }
        ],
    },
};

const groupChats = {
    1151: {
        groupName: 'Chill Crew',
        users: [0, 1, 2, 3, 4],
        admins: [0], // List of user_ids
        profilepic: 'https://picsum.photos/id/23/150',
        messages: [
            {
                "message_id": 1,
                "text_content": "Hey everyone! 🎉 Are we still on for the trip next month?",
                "sender": 0,
                "timestamp": "2024-09-23T18:00:00Z"
            },
            {
                "message_id": 2,
                "text_content": "Absolutely! I can't wait! Where are we thinking of going?",
                "sender": 3,
                "timestamp": "2024-09-23T18:05:00Z"
            },
            {
                "message_id": 3,
                "text_content": "I thought we could check out the mountains! 🏔️",
                "sender": 1,
                "timestamp": "2024-09-23T18:10:00Z"
            },
            {
                "message_id": 4,
                "text_content": "Sounds good! How many days are we planning to stay?",
                "sender": 2,
                "timestamp": "2024-09-23T18:15:00Z"
            },
            {
                "message_id": 5,
                "text_content": "Maybe a long weekend? Friday to Sunday?",
                "sender": 4,
                "timestamp": "2024-09-23T18:20:00Z"
            },
            {
                "message_id": 6,
                "text_content": "Perfect! Should we book a cabin?",
                "sender": 1,
                "timestamp": "2024-09-23T18:25:00Z"
            },
            {
                "message_id": 7,
                "text_content": "Yes! I found a few options online. I can share them!",
                "sender": 0,
                "timestamp": "2024-09-23T18:30:00Z"
            },
            {
                "message_id": 8,
                "text_content": "Definitely! And what about food? Should we plan meals?",
                "sender": 4,
                "timestamp": "2024-09-23T18:35:00Z"
            },
            {
                "message_id": 9,
                "text_content": "I can handle snacks and breakfast! 🍳",
                "sender": 2,
                "timestamp": "2024-09-23T18:40:00Z"
            },
            {
                "message_id": 10,
                "text_content": "I can take care of lunch and dinner! Just let me know what everyone likes.",
                "sender": 3,
                "timestamp": "2024-09-23T18:45:00Z"
            },
            {
                "message_id": 11,
                "text_content": "How about we do a barbecue one night? 🔥",
                "sender": 0,
                "timestamp": "2024-09-23T18:50:00Z"
            },
            {
                "message_id": 12,
                "text_content": "That sounds awesome! I can bring the grill!",
                "sender": 1,
                "timestamp": "2024-09-23T18:55:00Z"
            },
            {
                "message_id": 13,
                "text_content": "Let’s also plan some fun activities! Hiking, games, maybe a bonfire?",
                "sender": 4,
                "timestamp": "2024-09-23T19:00:00Z"
            },
            {
                "message_id": 14,
                "text_content": "Bonfire sounds perfect! I’ll bring some marshmallows! 🍫",
                "sender": 3,
                "timestamp": "2024-09-23T19:05:00Z"
            },
            {
                "message_id": 15,
                "text_content": "This trip is going to be epic! Can't wait! 🥳",
                "sender": 2,
                "timestamp": "2024-09-23T19:10:00Z"
            },
            {
                "message_id": 16,
                "text_content": "I can’t wait to disconnect from everything! 🌲",
                "sender": 0,
                "timestamp": "2024-09-23T19:15:00Z"
            },
            {
                "message_id": 17,
                "text_content": "Same here! We should also plan some evening games.",
                "sender": 1,
                "timestamp": "2024-09-23T19:20:00Z"
            },
            {
                "message_id": 18,
                "text_content": "What about card games? They’re always fun! 🃏",
                "sender": 2,
                "timestamp": "2024-09-23T19:25:00Z"
            },
            {
                "message_id": 19,
                "text_content": "Love that idea! We should also bring some music.",
                "sender": 4,
                "timestamp": "2024-09-23T19:30:00Z"
            },
            {
                "message_id": 20,
                "text_content": "I can bring my speaker! 🎶",
                "sender": 3,
                "timestamp": "2024-09-23T19:35:00Z"
            },
            {
                "message_id": 21,
                "text_content": "Let’s make a playlist together! Any song requests?",
                "sender": 0,
                "timestamp": "2024-09-23T19:40:00Z"
            },
            {
                "message_id": 22,
                "text_content": "I’m all about those campfire classics! 🎤",
                "sender": 1,
                "timestamp": "2024-09-23T19:45:00Z"
            },
            {
                "message_id": 23,
                "text_content": "This is shaping up to be an amazing trip! 🙌",
                "sender": 2,
                "timestamp": "2024-09-23T19:50:00Z"
            },
            {
                "message_id": 24,
                "text_content": "Can’t wait to relax and have fun with you all! 🌟",
                "sender": 4,
                "timestamp": "2024-09-23T19:55:00Z"
            }
        ],
    },
};

export function getUsers() {
    return users;
}
export function getUserData(userId) {
    return usersData[userId];
}
export function getPersonalChatPair(pairId) {
    return personalChatPairs[pairId];
}
export function getPersonalChatPairLastMessage(pairId) {
    const m = personalChatPairs[pairId].messages;
    return m[m.length - 1];
}
export function getGroupChat(groupId) {
    return groupChats[groupId];
}
export function getGroupChatData(groupId) {
    const gc = groupChats[groupId];
    return {
        groupName: gc.groupName,
        profilepic: gc.profilepic,
        lastMessage: gc.messages[gc.messages.length - 1],
    };
}