const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

function addMessage(sender, text) {
  chatBox.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("You", message);
  userInput.value = "";

  addMessage("Assistant", "Thinking...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    chatBox.lastChild.remove();
    addMessage("Assistant", data.reply);

  } catch (err) {
    chatBox.lastChild.remove();
    addMessage("Assistant", "Backend error");
  }
}
