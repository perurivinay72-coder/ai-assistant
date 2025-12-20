// Get elements
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

// Send text message
function sendMessage() {
    if (userInput.value.trim() === "") return;

    addMessage("You", userInput.value);
    addMessage("Assistant", "I heard you.");

    userInput.value = "";
}

// Add message to chat
function addMessage(sender, text) {
    chatBox.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Voice input
function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support voice input.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-IN'; // mixed English (works okay with Telugu-English mix)
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function (event) {
        const speechText = event.results[0][0].transcript;
        userInput.value = speechText;
    };

    recognition.onerror = function () {
        alert("Voice recognition error. Try again.");
    };
}
