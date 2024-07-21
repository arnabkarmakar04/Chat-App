import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css'; // Import the CSS file

const ENDPOINT = 'http://localhost:4000';
const username = prompt('Enter your username'); // Add a username

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server'); // Log connection
    });

    socket.on('message', (message) => {
      console.log('Message received:', message); // Log received messages
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      console.log('Disconnecting from server'); // Log disconnection
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', { user: username, text: message });
      setMessages([...messages, { user: username, text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user === username ? 'sent' : 'received'}`}>
              <span className="username">{msg.user}</span>
              <span className="text">{msg.text}</span>
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;








// made by Aniket karmakar(20th july 2024)
//to run the app u need to run npm start
