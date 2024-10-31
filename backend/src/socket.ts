import { Server } from "socket.io";
import { Message } from "./model/Message";

export const setupSocket = (io: Server) => {
    io.on('connection', async (socket) => {
        try {
            // Send all messages on connect.
            const messages = await Message.find();
            socket.emit('messages', messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }

        socket.on('sendMessage', async (data) => {
            const { name, message } = data;

            // TODO: add Validation logic
            const newMessage = new Message({ name, message });

            try {
                await newMessage.save();
                io.emit('newMessage', newMessage);
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });
    });
};
