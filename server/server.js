require('dotenv').config({ quiet: true })
const express = require("express")
const cors = require("cors")
const dns = require("dns")
const { Server } = require("socket.io");
const { createServer } = require('http');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const dbConfig = require("./dbConfig")
const router = require("./routes")
const cookieParser = require('cookie-parser')
const cloudConfig = require('./services/cloudConfig');
const app = express()
const server = createServer(app)

// ════════════════════ Middlewares ════════════════════
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
const io = new Server(server, { cors: { origin: "http://localhost:5173", credentials: true, } });
global.io = io
// ════════════════════ Socket io ════════════════════
const activeUsers = {};

io.on('connection', (socket) => {

    // ------- Join room single 
    socket.on("join_room", (convId) => {
        socket.join(convId)
    })

    // ---------- Typing and Stop typing --------------
    socket.on("typing", ({ convId, username }) => {
        socket.to(convId).emit("user_typing", { username });
    });

    socket.on("stop_typing", ({ convId }) => {
        socket.to(convId).emit("user_stopped_typing");
    });

    // ---------- Seen/unread --------------



    // ---------- Connection and disconnection --------------
    socket.on("user_connected", (userId) => {
        socket.userId = userId;

        // 1. Save the user to our memory list
        activeUsers[userId] = socket.id;

        // 2. Send the list of ALL online user IDs back to just this connecting user
        socket.emit("initial_online_users", Object.keys(activeUsers));

        // 3. Broadcast to everyone else that this user just came online
        socket.broadcast.emit("user_status_change", {
            userId: userId,
            status: "online"
        });
    });

    socket.on("disconnect", () => {
        // Find the userId that matches this disconnecting socket.id
        const userId = Object.keys(activeUsers).find(key => activeUsers[key] === socket.id);

        if (userId) {
            delete activeUsers[userId]; // Remove from our server RAM list

            // Broadcast to all other users that this person went offline
            socket.broadcast.emit("user_status_change", {
                userId: userId,
                status: "offline"
            });
        }
    });
});




// ════════════════════ Routes ════════════════════
app.use(router)

// ════════════════════ Database & config ════════════════════
dbConfig()
cloudConfig()

// ════════════════════ Server Listener ════════════════════
if (process.env.NODE_ENV !== "production") {
    server.listen(8000, () => {
        console.log('Server Is Running')
    })
}

module.exports = app