import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { io } from 'socket.io-client';
import Chat from './Chat';

// Mock socket.io-client
jest.mock('socket.io-client');

const mockSocket = {
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
};

(io as jest.Mock).mockReturnValue(mockSocket);

describe('Chat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders chat room header', () => {
    render(<Chat />);
    const headerElement = screen.getByText(/Chat Room/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('displays messages when received from socket', async () => {
    const mockMessages = [
      { name: 'Alice', message: 'Hello!' },
      { name: 'Bob', message: 'Hi there!' },
    ];

    mockSocket.on.mockImplementation((event, callback) => {
      if (event === 'messages') {
        callback(mockMessages);
      }
    });

    render(<Chat />);

    await waitFor(() => {
      mockSocket.on.mock.calls.forEach(([event, callback]) => {
        if (event === 'messages') callback(mockMessages);
      });
    });

    expect(screen.getByText(/Hello!/)).toBeInTheDocument();
    expect(screen.getByText(/Hi there!/)).toBeInTheDocument();
  });

  test('sends a new message when the form is submitted', async () => {
    render(<Chat />);

    const nameInput = screen.getByPlaceholderText(/Name/i);
    const messageInput = screen.getByPlaceholderText(/Message/i);
    const sendButton = screen.getByRole('button', { name: /Send/i });

    // Simulate user typing
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(messageInput, { target: { value: 'Hello!' } });

    // Simulate clicking the send button
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSocket.emit).toHaveBeenCalledWith('sendMessage', {
        name: 'Alice',
        message: 'Hello!',
      });
    });
  });

  test('clears message input after sending', async () => {
    render(<Chat />);

    const nameInput = screen.getByPlaceholderText(/Name/i);
    const messageInput = screen.getByPlaceholderText(/Message/i);
    const sendButton = screen.getByRole('button', { name: /Send/i });

    // Simulate user typing
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(messageInput, { target: { value: 'Hello!' } });

    // Simulate clicking the send button
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(messageInput).toHaveValue('');
    });
  });
});
