import React, { useEffect, useRef } from 'react';
import { Container, MessageBox } from './MessagesContainerStyles';
import { IMessage } from '../../../models/IMessage';

interface MessagesContainerProps {
  messages: IMessage[];
}

// MessagesContainer component
const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages }, ref) => {
  // Ref for the end of the messages - so page always scrolls to the end of the chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // initial load - Scroll to the bottom of the messages
  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Scroll to the bottom of the messages when new messages are added
  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

  return (
    <Container role="region">
      {messages.map((msg, index) => (
        <MessageBox key={index}>
          <strong>{msg.name}</strong><br/>
          {msg.message}
        </MessageBox>
      ))}
      {/* This div will act as the scroll target */}
      {messages.length > 0 && <div ref={messagesEndRef}></div>}
    </Container>
  );
};

export default MessagesContainer;

