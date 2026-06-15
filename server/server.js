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
io.on('connection', (socket) => {

    // ------- Join room single 
    socket.on("join_room", (convId) => {
        socket.join(convId)
    })

    socket.on("typing", ({ convId, username }) => {
        socket.to(convId).emit("user_typing", { username });
    }); 

    socket.on("stop_typing", ({ convId }) => {
        socket.to(convId).emit("user_stopped_typing");
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