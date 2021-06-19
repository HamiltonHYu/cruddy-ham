class Message {
  constructor(chatBoxDiv, content, createdAt) {
    this.chatBoxDiv = chatBoxDiv;
    this.content = content;
    this.createdAt = createdAt;

    this.messageDiv = document.createElement('div');
    this.messageDiv.innerText = this.content;

    this.editForm = document.createElement('form');
    this.editInput = document.createElement('input');
    this.editSubmit = document.createElement('input');
    this.editInput.type = 'text';
    this.editInput.value = this.content;
    this.editSubmit.type = 'submit';
    this.editSubmit.value = 'Edit';
    this.editForm.appendChild(this.editInput);
    this.editForm.appendChild(this.editSubmit);

    this.deleteButton = document.createElement('button');
    this.deleteButton.innerText = 'X';
    this.deleteButton.className = 'deleteButton';

    this.addToDom();
  }

  editMessage(e) {
    e.preventDefault();
    const body = JSON.stringify({ content: this.editInput.value });

    fetch(`/message/${ this.createdAt }`,
      {
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => res.json())
    .then(editedMessage => {
      this.messageDiv.innerText = editedMessage.content;
      this.editInput.value = editedMessage.content;
      this.messageDiv.appendChild(this.editForm);
      this.messageDiv.appendChild(this.deleteButton);
    }).catch(err => console.log(err));
  }

  deleteMessage() {
    fetch(`/message/${ this.createdAt }`, {
      method: 'DELETE',
    }).then(res => {
      if (res.status === 200) {
        // then remove message from DOM
        this.chatBoxDiv.removeChild(this.messageDiv);
      }
    }).catch(e => console.log(e));
  }

  addToDom() {
    this.editForm.addEventListener('submit', e => {
      this.editMessage(e);
    });

    this.deleteButton.addEventListener('click', () => {
      this.deleteMessage();
    });

    this.messageDiv.appendChild(this.editForm);
    this.messageDiv.appendChild(this.deleteButton);
    this.chatBoxDiv.appendChild(this.messageDiv);
  }
}
