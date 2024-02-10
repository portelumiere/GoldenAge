function toggleSettingsPopup() {
    var popup = document.getElementById('settings-popup');
    var backdrop = document.getElementById('backdrop');
    var body = document.body;

    popup.classList.toggle('hidden');
    backdrop.classList.toggle('hidden');
    
    // Toggle the overflow class on the body to prevent scrolling when the popup is open
    if (popup.classList.contains('hidden')) {
        body.style.overflow = ''; // Enable scrolling when popup is hidden
    } else {
        body.style.overflow = 'hidden'; // Disable scrolling when popup is visible
    }
}

function channelSettings() {
    // Implement channel settings functionality here
    console.log("Channel settings adjusted.");
}

function quitChannel() {
    //Implement function to leave the session and go back to account page
}

function promptBuilder() {
    //Implement function to leave the session and go back to account page
}
function botSwitch() {
    //Implement function to leave the session and go back to account page
}