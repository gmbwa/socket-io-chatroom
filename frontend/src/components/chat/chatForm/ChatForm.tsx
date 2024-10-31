import React, { FormEvent } from 'react';
import { FormContainer, InputWrapper, InputField, SendButton, MessageInputField } from './ChatFormStyles';

interface ChatFormProps {
  name: string;
  message: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

// ChatForm component
const ChatForm: React.FC<ChatFormProps> = ({ name, message, setName, setMessage, handleSendMessage }) => {
  // Handle form submission by pressing enter on the keyboard
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendMessage();
  };


  return (
      <FormContainer onSubmit={handleSubmit} aria-label="Chat Form">
        <InputWrapper>
          <InputField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-name"
          />
          <MessageInputField
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </InputWrapper>
      </FormContainer>
  );
};

export default ChatForm;
