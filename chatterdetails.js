document.addEventListener('DOMContentLoaded', () => {
    const activeChatName = document.getElementById('active-chat-name');
    const activeChatPopup = document.getElementById('active-chat-details-popup');
    const activeChatPicture = document.getElementById('active-chat-profile-picture');

    const toggleAndUpdatePopup = () => {
        toggleActiveChatPopup(); // Toggle the visibility of the popup
        // The updateActiveChatDetails function will be called within setActiveChat
    };

    activeChatName.addEventListener('click', toggleAndUpdatePopup);
    activeChatPicture.addEventListener('click', toggleAndUpdatePopup);

    // Other functionalities remain the same
});
function toggleActiveChatPopup() {
    const activeChatPopup = document.getElementById('active-chat-details-popup');
    activeChatPopup.classList.toggle('active');
}

// This function should be defined where chat object is available, e.g., within setActiveChat
function updateActiveChatDetailsPopup(chat) {
    const activeChatPopupPicture = document.getElementById('active-chat-picture');
    const activeChatPopupName = document.getElementById('active-chat-name-popup');
    const activeChatPopupAbout = document.getElementById('active-chat-about');

    // Update the popup content with active chat details
    activeChatPopupPicture.src = chat.profilePic;
    activeChatPopupName.textContent = chat.name;
    activeChatPopupAbout.textContent = "About this chat..."; // Populate with actual chat about info if available
}

let currentChatId; 
// The setActiveChat function now also updates the active chat details popup
function setActiveChat(chat) {
    // Store the active chat's ID for later use
    currentChatId = chat.id;
    // Update active chat details popup
    updateActiveChatDetailsPopup(chat);
}



//TAGS
// Define functions for Tag, Block, Report, and Delete operations
let tags = []; // To store custom tags
let chatTags = {}; // To map chat IDs to tags
function showTagsPopup() {
    const tagPopup = document.getElementById('tag-popup');
    tagPopup.style.display = 'block'; // Show the tag popup
}
function closeTagPopup() {
    const tagPopup = document.getElementById('tag-popup');
    tagPopup.style.display = 'none';
}
//Create Custom TAGS
function createCustomTag() {
    const tagName = prompt("Enter the name for the new tag:");
    if (tagName) {
        const newTag = {
            id: tags.length + 1, // Simple ID assignment, consider using a more robust method
            name: tagName
        };
        tags.push(newTag);
        console.log("Tag created:", newTag);

        // Update the UI to reflect the new tag
        const predefinedTags = document.getElementById('predefined-tags');
        const tagButton = document.createElement('button');
        tagButton.className = 'tag-button';
        tagButton.dataset.tagId = newTag.id;
        tagButton.textContent = newTag.name;
        tagButton.onclick = function() {
            assignTagToChat(currentChatId, newTag.id);
        };
        predefinedTags.appendChild(tagButton);
    }
}
//Assign Tags
function assignTagToChat(chatId, tagId) {
    if (!chatTags[chatId]) {
        chatTags[chatId] = [];
    }
    if (!chatTags[chatId].includes(tagId)) {
        chatTags[chatId].push(tagId);
        console.log(`Tag ${tagId} assigned to chat ${chatId}`);
        // Update UI or perform additional actions as necessary
        updateChatUIWithTag(chatId, tagId);
    }
}
function updateChatUIWithTag(chatId, tagId) {
    // This function should update the chat UI to show the newly assigned tag
    // The implementation will depend on how your app's UI is structured
    // For example, you might append a new "tag" element to the chat's UI representation
}

// This is a placeholder function for saving the chatTags mapping to persistent storage
function saveChatTagsToStorage(chatTags) {
    // Implementation depends on the storage solution (e.g., local storage, a database)
    // localStorage.setItem('chatTags', JSON.stringify(chatTags));
}
//UPDATE TAG POPUP
function updateTagPopup() {
    const predefinedTags = document.getElementById('predefined-tags');
    predefinedTags.innerHTML = ''; // Clear existing tags
    tags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.className = 'tag-button';
        tagButton.dataset.tagId = tag.id;
        tagButton.textContent = tag.name;
        tagButton.onclick = function() {
            // Assuming you have a way to get the current chat's ID
            assignTagToChat(currentChatId, tag.id);
        };
        predefinedTags.appendChild(tagButton);
    });
}



function blockChat() {
    // Block chat implementation
}

function reportChat() {
    // Report chat implementation
}

function deleteChat() {
    // Delete chat implementation
}
