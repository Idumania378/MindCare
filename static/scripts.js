document.getElementById("chat-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    appendMessage("You", message, "user");
    input.value = "";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        appendMessage("Bot", data.response, "bot");
    } catch (err) {
        appendMessage("Bot", "Sorry, there was a problem.", "bot");
    }
});

function appendMessage(sender, text, cls) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.classList.add("message", cls);
    msg.innerText = `${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
