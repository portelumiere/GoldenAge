// Function to open the attachment popup

document.getElementById('attach-button').addEventListener('click', toggleAttachmentPopup);
document.getElementById('attach-button').addEventListener('click', positionAttachments);

function toggleAttachmentPopup() {
    const attachmentPopup = document.getElementById('attachment-popup');
    attachmentPopup.classList.toggle('hidden');
}

// Function to position the Attachment File
function positionAttachments() {
    const chatInput = document.querySelector('#chat-input');
    const attachmentPopup = document.querySelector('#attachment-popup');
    const rect = chatInput.getBoundingClientRect();

    // Set the style of the emoji picker dynamically
    attachmentPopup.style.position = 'absolute';
    attachmentPopup.style.bottom = `${chatInput.offsetHeight+15}px`; // Position above the chat input
    attachmentPopup.style.left = `${chatInput.offsetWidth}px` // Center horizontally
    attachmentPopup.style.transform = 'translateX(-50%)';
    attachmentPopup.style.width = auto; // Set width to match chat input
}

// Function to close the attachment popup
function closeAttachmentPopup() {
    const attachmentPopup = document.getElementById('attachment-popup');
    attachmentPopup.classList.add('hidden');
}

// Example functions that could be called when an attachment option is selected
function selectDocument() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/*'; // Accepts all document file types
    input.onchange = (e) => {
        let file = e.target.files[0];
        console.log('Document selected:', file.name);
        // Handle the selected file further (upload, display filename, etc.)
    };
    input.click();
}

function selectImage() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*'; // Accepts both image and video file types
    input.onchange = (e) => {
        let file = e.target.files[0];
        console.log('Photo or Video selected:', file.name);
        // Handle the selected file further
    };
    input.click();
}

function selectCamera() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Suggests the device's camera for image capture
    input.onchange = (e) => {
        let file = e.target.files[0];
        console.log('Image taken with camera:', file.name);
        // Handle the captured image further
    };
    input.click();
}

function selectLocation() {
    let latInput = document.createElement('input');
    latInput.type = 'text';
    latInput.placeholder = 'Enter latitude';

    let lngInput = document.createElement('input');
    lngInput.type = 'text';
    lngInput.placeholder = 'Enter longitude';

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Send Location';
    submitButton.onclick = function() {
        let latitude = latInput.value.trim();
        let longitude = lngInput.value.trim();
        if (latitude && longitude) {
            console.log('Location selected:', latitude, longitude);
            // Construct Google Maps URL
            let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            console.log('Google Maps URL:', mapsUrl);
            // You can now send the mapsUrl to the chat or handle it as needed
        } else {
            console.log('Please enter both latitude and longitude');
        }
    };

    // Append the inputs and the button to the document or a specific element
    document.body.appendChild(latInput);
    document.body.appendChild(lngInput);
    document.body.appendChild(submitButton);
}
