async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);

    const response = await fetch("/get_response", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: userInput})
    });

    const data = await response.json();
    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.innerText = data.reply;
    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById("user-input").value = "";
}

async function detectUserEmotion() {
    const response = await fetch("/get_emotion");
    const data = await response.json();
    const emotion = data.emotion;

    const chatBox = document.getElementById("chat-box");
    const emotionMessage = document.createElement("div");
    emotionMessage.className = "bot-message";
    emotionMessage.innerText = `👀 You seem to be feeling: ${emotion}`;
    chatBox.appendChild(emotionMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}
