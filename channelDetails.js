document.addEventListener('DOMContentLoaded', () => {
    // Function to show the bot details popup
    window.showBotDetails = () => {
        const popup = document.getElementById('bot-details-popup');
        popup.classList.add('active');
    }

    // Function to close the bot details popup
    window.closeBotDetails = () => {
        const popup = document.getElementById('bot-details-popup');
        popup.classList.remove('active');
    }

    // Add click event listener to the bot name
    const botNameElement = document.getElementById('bot-name');
    botNameElement.addEventListener('click', showBotDetails);

    // Add click event listener to the bot name
    const botPicElement = document.getElementById('bot-pic');
    botPicElement.addEventListener('click', showBotDetails);

    // Example bot channel details
    const botChannelDetails = {
        name: 'Bot Name',
        profilePic: 'profile_pictures/Logo.png',
        catalogItems: [/* array of catalog items */],
        about: 'This is the bot description.',
        email: 'bot@example.com',
        website: 'https://www.example.com'
    };

    // Function to update the bot channel name and picture in the main interface
    function updateBotChannelMainInterface(details) {
        const botNameElement = document.querySelector('.bot-name-main');
        const botProfilePicElement = document.querySelector('.bot-profile-pic-main');
        botNameElement.textContent = details.name;
        botProfilePicElement.src = details.profilePic;
    }

    // Function to update the bot channel name and picture in the popup
    function updateBotChannelPopup(details) {
        const botNameElementPopup = document.querySelector('.bot-name-popup');
        const botProfilePicElementPopup = document.querySelector('.bot-profile-pic-popup');
        botNameElementPopup.textContent = details.name;
        botProfilePicElementPopup.src = details.profilePic;
    }

    // Function to update all bot channel details
    function updateBotChannelDetails(details) {
        updateBotChannelMainInterface(details);
        updateBotChannelPopup(details);
        // Add more functions to update other details if needed
    }

    // Update all bot channel details on page load
    updateBotChannelDetails(botChannelDetails);
    
    // Add event listener to profile picture for displaying larger image
    const botProfilePicElementPopup = document.querySelector('.bot-profile-pic-popup');
    botProfilePicElementPopup.addEventListener('click', () => {
        // Open a modal or show a larger version of the image
        // For demonstration, simply alert the image URL
        alert(botChannelDetails.profilePic);
    });
    
    // More code...
});
