import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessagesContainer from './MessagesContainer';

const mockMessages = [
  { name: 'Alice', message: 'Hello everyone!' },
  { name: 'Bob', message: 'Hi Alice!' },
  { name: 'Charlie', message: 'Hey there!' },
];

describe('MessagesContainer Component', () => {
  let scrollIntoViewMock: jest.Mock;

  beforeAll(() => {
    // Set up a global mock for scrollIntoView
    scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  afterEach(() => {
    // Reset the mock after each test
    scrollIntoViewMock.mockClear();
  });

  test('renders all messages correctly', () => {
    render(<MessagesContainer messages={mockMessages} />);

    mockMessages.forEach((msg) => {
      expect(screen.getByText(msg.name)).toBeInTheDocument();
      expect(screen.getByText(msg.message)).toBeInTheDocument();
    });
  });

  test('scrolls to the bottom when new messages are added', () => {
    const { rerender } = render(<MessagesContainer messages={mockMessages} />);

    // Confirm initial scroll on first render
    expect(scrollIntoViewMock).toHaveBeenCalled();

    // Rerender with an additional message
    const newMessages = [
      ...mockMessages,
      { name: 'David', message: 'Good to see you all!' },
    ];
    rerender(<MessagesContainer messages={newMessages} />);

    // Confirm scrollIntoView was called again due to new message
    expect(scrollIntoViewMock.mock.calls.length).toBeGreaterThanOrEqual(2);

  });

  test('renders an empty container when no messages are present', () => {
    render(<MessagesContainer messages={[]} />);
    const container = screen.getByRole('region', { hidden: true });
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
});
