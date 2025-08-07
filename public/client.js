// public/client.js
const socket = io();
const editor = document.getElementById('editor');

// When the client receives the initial document content from the server
socket.on('document', (content) => {
    editor.value = content;
});

// When the user types in the textarea, send the change to the server
editor.addEventListener('input', (event) => {
    const newContent = editor.value;
    socket.emit('document_change', newContent);
});

// When the client receives a document change from another user
socket.on('document_change', (newContent) => {
    // Only update the editor if the content is different
    // This prevents the user's own changes from causing an update loop
    if (editor.value !== newContent) {
        editor.value = newContent;
    }
});