import io from "socket.io-client"
import { store } from "../redux/store"
import { addMessage } from "../redux/slices/messagesSlice"
import { addOnlineUser, setOnlineUsers } from "../redux/slices/onlineUserSlice"

let socket

// Accept userId as a parameter
const initSocket = (userId) => {
    socket = io.connect(import.meta.env.VITE_API_URL)

    socket.on("connect", () => {
        if (userId) {
            socket.emit("user_connected", userId);
        }

        socket.on("initial_online_users", (onlineUserIds) => {
            store.dispatch(setOnlineUsers(onlineUserIds));
        });

        socket.on('user-status-changed', (data) => {
            const { userId, status } = data;
            if (status === "online") {
                store.dispatch(addOnlineUser(userId));
            }
        });
    });

    socket.on("new_message", (res) => {
        store.dispatch(addMessage(res))
    });
}

export { socket, initSocket }