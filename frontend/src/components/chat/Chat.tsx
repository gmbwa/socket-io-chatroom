import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatForm from './chatForm/ChatForm';
import { Container, Header } from './ChatStyles';
import MessagesContainer from './messagesContainer/MessagesContainer';
import { IMessage } from '../../models/IMessage';

// Set up the socket connection
const socket = io('http://localhost:5000');

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('messages', (data: IMessage[]) => {
      setMessages(data);
    });

    socket.on('newMessage', (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('messages');
      socket.off('newMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (name && message) {
      socket.emit('sendMessage', { name, message });
      setMessage('');
    }
  };

  return (
    <Container>
      <Header>Chat Room</Header>
      {messages.length > 0 && <MessagesContainer messages={messages}/>}
      <ChatForm 
        name={name}
        message={message}
        setName={setName}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </Container>
  );
};

export default Chat;
