import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import '../styles/chat.css'; 

const Chat = () => {
    const [sender, setSender] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState('');

    useEffect(() => {
        const socket = io.connect('http://localhost:3000');

        socket.on('chat', data => {
            setMessages(prevMessages => [...prevMessages, { sender: data.sender, message: data.message }]);
        });

        socket.on('typing', data => {
            setTyping(`${data} typing...`);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSubmit = () => {
        const socket = io.connect('http://localhost:3000');
        socket.emit('chat', { message, sender });
        setMessage('');
    };

    const handleTyping = () => {
        const socket = io.connect('http://localhost:3000');
        socket.emit('typing', sender);
    };

    return (
        <div id="chat-wrap">
            <h2>Sohbet</h2>
            <div id="chat-window">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.sender} : </strong>{msg.message}</p>
                    </div>
                ))}
            </div>
            <input type="text" id="sender" placeholder="İsim" value={sender} onChange={e => setSender(e.target.value)} />
            <input type="text" id="message" placeholder="Mesaj Gir" value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleTyping} />
            <button id="submitBtn" onClick={handleSubmit}>Gönder</button>
            <div id="feedback">
                <p>{typing}</p>
            </div>
        </div>
    );
};

export default Chat;
