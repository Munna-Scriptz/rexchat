import io from "socket.io-client"
import { store } from "../redux/store"
import { addMessage } from "../redux/slices/messagesSlice"
import { addOnlineUser, removeOnlineUser, setOnlineUsers } from "../redux/slices/onlineUserSlice"
import { clearUnread, incrementUnread } from "../redux/slices/unreadSlice"

let socket
let currentUserId

const initSocket = (userId) => {
    currentUserId = userId
    socket = io.connect(import.meta.env.VITE_API_URL)

    // -------------- User online status --------------
    socket.on("connect", () => {
        if (userId) {
            socket.emit("user_connected", userId);
        }

        socket.on("initial_online_users", (onlineUserIds) => {
            store.dispatch(setOnlineUsers(onlineUserIds));
        });

        socket.on('user_status_change', (data) => {
            const { userId, status } = data;
            if (status === "online") {
                store.dispatch(addOnlineUser(userId));
            } else if (status === "offline") {
                store.dispatch(removeOnlineUser(userId))
            }
        });
    });

    socket.on("messages_seen", (data) => {
        store.dispatch(clearUnread(data.conversation))
    });

    socket.on("new_message", (res) => {
        store.dispatch(addMessage(res))
        if (res?.sender?.toString?.() !== currentUserId?.toString?.()) {
            store.dispatch(incrementUnread(res.conversation))
        }
    });
}

export { socket, initSocket }
