async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Append user's message
    chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    input.value = "";

    // Get bot response
    const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
