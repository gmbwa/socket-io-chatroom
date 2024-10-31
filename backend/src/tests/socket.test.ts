import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
import { expect } from "chai";
import io from "socket.io-client";
import { setupSocket } from "../socket";
import { IMessage, Message } from "../model/Message";
import { connectDatabase } from "../db";

let server: Server;

describe("Socket.IO Chat Room", function () {
    // Set a timeout for async ops
    this.timeout(10000);

    before(async () => {
        await connectDatabase();

        const httpServer = createServer();
        server = new Server(httpServer);
        setupSocket(server);

        // Start listening for connections
        await new Promise<void>((resolve) => {
            httpServer.listen(3000, resolve);
        });
    });

    after(async () => {
        if (mongoose.connection.db && mongoose.connection.readyState === 1) { 
            // Clear data after tests
            await mongoose.connection.db.dropDatabase();
        }
        await mongoose.connection.close(); 
        server.close();
    });

    it("should send existing messages on connect", async () => {
        const message = new Message({ name: "Test User", message: "Hello!" });
        await message.save();

        let clientSocket = io("http://localhost:3000");

        // Wait for messages on the client
        await new Promise<void>((resolve) => {
            clientSocket.on("messages", (messages: IMessage[]) => {
                expect(messages).to.have.lengthOf(1);
                expect(messages[0].name).to.equal("Test User");
                expect(messages[0].message).to.equal("Hello!");
                clientSocket.disconnect();
                resolve();
            });
        });
    });

    it("should broadcast new messages to all clients", async () => {
        const message = { name: "User", message: "Hello everyone!" };

        const anotherClient = io("http://localhost:3000");
        const anotherClient2 = io("http://localhost:3000");

        await new Promise<void>((resolve) => {
            anotherClient.on("newMessage", (receivedMessage: IMessage) => {
                expect(receivedMessage.name).to.equal(message.name);
                expect(receivedMessage.message).to.equal(message.message);
                anotherClient.disconnect();
                anotherClient2.disconnect();
                resolve();
            });
            anotherClient2.emit("sendMessage", message);
        });
    });
});
