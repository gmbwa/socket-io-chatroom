import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatForm from './ChatForm';

describe('ChatForm', () => {
    const mockSetName = jest.fn();
    const mockSetMessage = jest.fn();
    const mockHandleSendMessage = jest.fn();

    beforeEach(() => {
        render(
            <ChatForm
                name=""
                message=""
                setName={mockSetName}
                setMessage={mockSetMessage}
                handleSendMessage={mockHandleSendMessage}
            />
        );
    });

    test('renders name and message inputs and send button', () => {
        const nameInput = screen.getByPlaceholderText(/name/i);
        const messageInput = screen.getByPlaceholderText(/message/i);
        const sendButton = screen.getByRole('button', { name: /send/i });

        expect(nameInput).toBeInTheDocument();
        expect(messageInput).toBeInTheDocument();
        expect(sendButton).toBeInTheDocument();
    });

    test('allows users to type in name and message fields', () => {
        const nameInput = screen.getByPlaceholderText(/name/i);
        const messageInput = screen.getByPlaceholderText(/message/i);

        // Simulate typing in the name input
        fireEvent.change(nameInput, { target: { value: 'John' } });
        expect(mockSetName).toHaveBeenCalledWith('John');

        // Simulate typing in the message input
        fireEvent.change(messageInput, { target: { value: 'Hello!' } });
        expect(mockSetMessage).toHaveBeenCalledWith('Hello!');
    });

    test('calls handleSendMessage on form submit', () => {
        const nameInput = screen.getByPlaceholderText(/name/i);
        const messageInput = screen.getByPlaceholderText(/message/i);
        const form = screen.getByRole('form');

        // Simulate entering values
        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(messageInput, { target: { value: 'Hello!' } });

        // Submit the form
        fireEvent.submit(form);
        expect(mockHandleSendMessage).toHaveBeenCalled();
    });

    test('calls handleSendMessage when the send button is clicked', () => {
        const sendButton = screen.getByRole('button', { name: /send/i });

        fireEvent.click(sendButton);
        
        expect(mockHandleSendMessage).toHaveBeenCalled();
    });
});
