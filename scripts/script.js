function sendMessage() {
  const input = document.getElementById('userInput');
  const chat = document.getElementById('chat');
  const userText = input.value.trim();

  if (userText === '') return;

  chat.innerHTML += `<div class='message user'>👤 Tú: ${userText}</div>`;
  chat.innerHTML += `<div class='message bot'>🤖 Bot: Procesando tu solicitud...</div>`;
  chat.scrollTop = chat.scrollHeight;
  input.value = '';
}
