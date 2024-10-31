
# Real-Time Chat Application

A simple real-time public chat application using Node.js, MongoDB, and React.

## Features
- Real-time chat updates using Socket.io
- Simple message posting form requiring a name and message
- MongoDB storage for persistent chat messages
- Single-page React application for a responsive user experience

## Prerequisites
- Docker and Docker Compose installed
- Node.js (v20+) and npm installed for local development

## Setup Instructions

### Start MongoDB with Docker
Launch MongoDB with Docker Compose to save chat messages. First, ensure Docker is running, then execute the following command:

```bash
docker-compose up -d
```

### Backend Setup
In the `backend` folder, install dependencies and start the server:

```bash
cd backend
npm install
npm run dev
```

The backend server will now be accessible at `http://localhost:5000`. You can verify that it’s running by checking the response, which should return a simple JSON object:

```json
{
  "server": "up"
}
```

### Frontend Setup
In a new terminal, navigate to the `frontend` folder, install dependencies, and start the React application:

```bash
cd frontend
npm install
npm start
```

The React frontend will now be available at `http://localhost:3000`.


---

Once the backend, frontend, and MongoDB are all running, open your browser and go to `http://localhost:3000` to use the chat application.

## Tests
### Backend: 

```bash
cd backend
npm run test
```

### Frontend
```bash
cd frontend
npm run test
```