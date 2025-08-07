// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

let documentContent = ""; // A simple string to hold the document content

io.on('connection', (socket) => {
    console.log('a user connected');

    // Send the current document content to the new user
    socket.emit('document', documentContent);

    // Listen for changes from clients
    socket.on('document_change', (change) => {
        // Update the document content
        documentContent = change;

        // Broadcast the change to all other clients
        socket.broadcast.emit('document_change', change);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});