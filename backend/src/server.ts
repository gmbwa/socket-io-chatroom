import express from 'express';
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { connectDatabase } from './db';
import { config } from './config';
import { setupSocket } from './socket';
import cors from 'cors';

const app = express();

// CORS configuration to only allow localhost:3000 on the socket and server
const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
// Use CORS middleware
app.use(cors(corsOptions));

const server = http.createServer(app);

// Initialize Socket.IO with the CORS options
const io = new SocketServer(server, {cors: corsOptions});

connectDatabase();
setupSocket(io);

app.get('/', (req, res) => {
    res.send({server: "up"})
})

const PORT = config.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
