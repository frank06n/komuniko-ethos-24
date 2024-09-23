const messagesData = {
    'John Doe': [
        { id: '1', text: 'Hello!', sender: 'John Doe' },
        { id: '2', text: 'Hi, how are you?', sender: 'Me' },
        { id: '3', text: 'I’m good, thanks!', sender: 'John Doe' },
        { id: '4', text: 'Glad to hear. What’s up?', sender: 'Me' },
        { id: '5', text: 'Just chilling. You?', sender: 'John Doe' },
        { id: '6', text: 'Same here.', sender: 'Me' },
        // Add more as needed
    ],
    'Jane Smith': [
        { id: '1', text: 'Hey!', sender: 'Jane Smith' },
        { id: '2', text: 'Hi Jane, what’s up?', sender: 'Me' },
        { id: '3', text: 'Just wanted to check in.', sender: 'Jane Smith' },
        // Add more as needed
    ],
    'Michael Johnson': [
        { id: '1', text: 'Are we still on for tonight?', sender: 'Michael Johnson' },
        { id: '2', text: 'Yes, absolutely!', sender: 'Me' },
        // Add more as needed
    ],
    'Emily Davis': [
        { id: '1', text: 'Can you send the file?', sender: 'Emily Davis' },
        { id: '2', text: 'Sure, I’ll do it now.', sender: 'Me' },
        // Add more as needed
    ],
    'Sarah Williams': [
        { id: '1', text: 'Have you heard from them?', sender: 'Sarah Williams' },
        { id: '2', text: 'Not yet, still waiting.', sender: 'Me' },
        // Add more as needed
    ],
    'Family Group': [
        { id: '1', text: 'Hey everyone, what’s the dinner plan?', sender: 'Mom' },
        { id: '2', text: 'Let’s do pizza!', sender: 'Dad' },
        { id: '3', text: 'I’m in for pizza.', sender: 'Me' },
        { id: '4', text: 'Can we get a salad too?', sender: 'Sister' },
        { id: '5', text: 'Of course!', sender: 'Mom' },
        { id: '6', text: 'Great!', sender: 'Dad' }
        // Add more as needed
    ],
    'Friends Group': [
        { id: '1', text: 'Let’s meet up tomorrow?', sender: 'Friend 1' },
        { id: '2', text: 'I’m free after 6pm.', sender: 'Me' },
        { id: '3', text: 'Same here.', sender: 'Friend 2' },
        { id: '4', text: '6pm works for me.', sender: 'Friend 3' },
        // Add more as needed
    ],
    'Work Group': [
        { id: '1', text: 'We need to finalize the report.', sender: 'Boss' },
        { id: '2', text: 'I’ve already submitted my part.', sender: 'Me' },
        { id: '3', text: 'I’ll finish mine by tomorrow.', sender: 'Colleague 1' },
        { id: '4', text: 'Great, let’s review at 9am.', sender: 'Boss' },
        // Add more as needed
    ]
};

const chats = [
    { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?', avatar: 'https://picsum.photos/150/300', type: 'person' },
    { id: '2', name: 'Jane Smith', lastMessage: 'Let’s catch up tomorrow!', avatar: 'https://picsum.photos/150/301', type: 'person' },
    { id: '3', name: 'Michael Johnson', lastMessage: 'Sounds good!', avatar: 'https://picsum.photos/150/302', type: 'person' },
    { id: '4', name: 'Emily Davis', lastMessage: 'What’s the update?', avatar: 'https://picsum.photos/150/303', type: 'person' },
    { id: '5', name: 'Sarah Williams', lastMessage: 'I’ll send it over.', avatar: 'https://picsum.photos/150/304', type: 'person' },
    { id: '6', name: 'Family Group', lastMessage: 'See you all at dinner!', avatar: 'https://picsum.photos/150/306', type: 'group' },
    { id: '7', name: 'Friends Group', lastMessage: 'Let’s meet at 6pm!', avatar: 'https://picsum.photos/150/309', type: 'group' },
    { id: '8', name: 'Work Group', lastMessage: 'Meeting tomorrow at 9am', avatar: 'https://picsum.photos/150/315', type: 'group' },
    { id: '9', name: 'Yasin Rauri', lastMessage: 'Hey, how are you?', avatar: 'https://picsum.photos/150/299', type: 'person' },
    { id: '10', name: 'Tony Chaudhary', lastMessage: 'Let’s catch up tomorrow!', avatar: 'https://picsum.photos/150/208', type: 'person' },
    { id: '11', name: 'Mitchell Stark', lastMessage: 'Sounds good!', avatar: 'https://picsum.photos/150/210', type: 'person' },
    { id: '12', name: 'Himachal Dey', lastMessage: 'What’s the update?', avatar: 'https://picsum.photos/150/203', type: 'person' },
    { id: '13', name: 'Atul Smith', lastMessage: 'Let’s catch up tomorrow!', avatar: 'https://picsum.photos/150/211', type: 'person' },
    { id: '14', name: 'Dravid Shek', lastMessage: 'Sounds good!', avatar: 'https://picsum.photos/150/212', type: 'person' },
];



export function getChatsList() {
    return chats;
}
export function getChatData(name) {
    return messagesData[name];
}