 
        document.addEventListener('DOMContentLoaded', () => {
            const chatList = document.getElementById('chat-list');
            const activeChatName = document.getElementById('active-chat-name');
            const searchChat = document.getElementById('search-chat');
            const chatInput = document.querySelector('#chat-input');
            const sendButton = document.querySelector('#send-button');
            


            // Toggle the emoji picker and position it correctly
            const emojiButton = document.querySelector('#emoji-button');
            const emojiPicker = document.querySelector('#emoji-picker');

            emojiButton.addEventListener('click', () => {
                positionEmojiPicker(); // Call the function to position the emoji picker
                emojiPicker.classList.toggle('hidden'); // Then toggle the visibility
            });
            
            // Function to position the emoji picker
            function positionEmojiPicker() {
                const chatInput = document.querySelector('#chat-input');
                const emojiPicker = document.querySelector('#emoji-picker');
                const rect = chatInput.getBoundingClientRect();

                // Set the style of the emoji picker dynamically
                emojiPicker.style.position = 'absolute';
                emojiPicker.style.bottom = `${chatInput.offsetHeight+15}px`; // Position above the chat input
                emojiPicker.style.left = `50%`; // Center horizontally
                emojiPicker.style.transform = 'translateX(-50%)';
                emojiPicker.style.width = `${chatInput.offsetWidth}px`; // Set width to match chat input
            }

            document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
                const chatInput = document.querySelector('#chat-input');
                chatInput.value += event.detail.emoji.unicode; // Append the selected emoji to the chat input value
            });



            // Function to update chat window
            function setActiveChat(chat) {
                // Select elements by their IDs
                const activeChatName = document.getElementById('active-chat-name');
                const activeChatStatus = document.getElementById('active-chat-status');
                const activeChatProfilePicture = document.getElementById('active-chat-profile-picture');

                // Update the elements' content with the selected chat's details
                activeChatName.textContent = chat.name;
                activeChatStatus.textContent = 'Online'; // Assuming all chats are 'Online', you can modify this as needed
                activeChatProfilePicture.src = chat.profilePic;
                activeChatProfilePicture.alt = `${chat.name} profile picture`; // Update alt text for accessibility
                
                // Additionally, update active chat details popup
                updateActiveChatDetailsPopup(chat);
                
                // Clear previous messages and set new ones
                const messagesContainer = document.getElementById('messages');
                messagesContainer.innerHTML = ''; // Clear previous messages
                const messages = chatMessages[chat.id] || []; // Get messages for the selected chat
                
                messages.forEach(msg => {
                    // Create a message element
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('p-2', 'my-1', 'rounded-lg', 'inline-block', 'clear-both');
                    if(msg.from === 'You') {
                    messageElement.classList.add('bg-green-200', 'float-right'); // Styles for messages from 'You'
                    } else {
                    messageElement.classList.add('bg-white', 'float-left'); // Styles for messages from others
                    }
                    messageElement.innerHTML = `
                    <div>
                        <p class="text-gray-800">${msg.message}</p>
                        <p class="text-gray-500 text-xs">${msg.time}</p>
                    </div>
                    `;
                    messagesContainer.appendChild(messageElement);
                });
                }
            
            // Example chat data
            const chats = [
                { id: 1, name: 'Sarah Orange Bobo', lastMessage: 'C\'est Siebou Casimir', profilePic: 'https://placehold.co/100x100' },
                { id: 2, name: 'John Doe', lastMessage: 'Hello World', profilePic: 'https://placehold.co/100x100' },
                { id: 3, name: 'Jane Smith', lastMessage: 'See you soon!', profilePic: 'https://placehold.co/100x100' }
            ];
            // Mock data for chat messages
            const chatMessages = {
                '1': [
                    { from: 'Sarah Orange Bobo', message: 'Hey there!', time: '2:30 PM' },
                    { from: 'You', message: 'Hello!', time: '2:35 PM' }
                ],
                '2': [
                    { from: 'John Doe', message: 'Hello World', time: '3:10 PM' },
                    { from: 'You', message: 'Hi!', time: '3:15 PM' }
                ],
                '3': [
                    { from: 'Jane Smith', message: 'See you soon!', time: '4:00 PM' },
                    { from: 'You', message: 'Can\'t wait!', time: '4:05 PM' }
                ]
            };

            // Function to render the chat list
            function renderChats(chats) {
                chatList.innerHTML = ''; // Clear the chat list
                chats.forEach(chat => {
                    const chatItem = document.createElement('div');
                    chatItem.classList.add('flex', 'items-center', 'p-3', 'hover:bg-blue-700', 'cursor-pointer');
                    chatItem.innerHTML = `
                        <img class="h-10 w-10 rounded-full mr-3" src="${chat.profilePic}" alt="${chat.name} profile picture">
                        <div>
                            <p class="text-white font-semibold">${chat.name}</p>
                            <p class="text-amber-400 text-sm">${chat.lastMessage}</p>
                        </div>
                    `;
                    chatItem.addEventListener('click', () => setActiveChat(chat));
                    chatList.appendChild(chatItem);
                });
            }
            

            document.querySelectorAll('#chat-list > div').forEach(item => {
            item.addEventListener('click', () => {
                const chatId = item.getAttribute('data-chat-id');
                const chat = chats.find(c => c.id.toString() === chatId);
                if (chat) {
                    setActiveChat(chat);
                }
            });
        });


            // Search functionality
            searchChat.addEventListener('input', () => {
                const keyword = searchChat.value.toLowerCase();
                const filteredChats = chats.filter(chat =>
                    chat.name.toLowerCase().includes(keyword) || chat.lastMessage.toLowerCase().includes(keyword)
                );
                renderChats(filteredChats);
            });

            // Initial rendering of chats
            renderChats(chats);


            // Function to send the message
            function sendMessage() {
                let messageContent = document.getElementById('chat-input').value;
                if (messageContent.trim() !== '') {
                    let messagesContainer = document.getElementById('messages');
                    let messageElement = document.createElement('div');
                    messageElement.innerHTML = `
                        <div class="flex items-end justify-end mb-4">
                            <div class="bg-white p-3 rounded-md shadow">
                                <p>${messageContent}</p>
                            </div>
                            <p class="text-xs text-yellow-600 ml-2">${new Date().toLocaleTimeString()}</p>
                        </div>
                    `;
                    messagesContainer.appendChild(messageElement);
                    document.getElementById('chat-input').value = ''; // Clear the input after sending
                }
            }

            sendButton.addEventListener('click', sendMessage);
            document.getElementById('chat-input').addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        });
