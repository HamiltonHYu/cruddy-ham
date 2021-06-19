console.log('running the script');

document.addEventListener('DOMContentLoaded', () => {
  const chatBoxDiv = document.getElementById('messages');
  
  fetch('/message')
    .then(res => res.json())
    .then(messages => {
      messages.forEach((message, i) => {
        new Message(chatBoxDiv, message.content, message.createdAt);
      });
    }).catch(e => console.log(e));

  document.getElementById('messageForm')
    .addEventListener('submit', e => {
      e.preventDefault();

      const input = document.getElementById('content');
      const newMessageContent = input.value;
      input.value = '';
      
      fetch('/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic secret_key',
        },
        body: JSON.stringify({ content: newMessageContent }),
      }).then(res => res.json())
      .then(message => {
        new Message(chatBoxDiv, message.content, message.createdAt);
      });
    });
});
