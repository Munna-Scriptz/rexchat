import io from "socket.io-client"
import { store } from "../redux/store"
import { addMessage } from "../redux/slices/messagesSlice"
import { addStatus, addUserId } from "../redux/slices/userStatusSlice"

let socket

// Accept userId as a parameter
const initSocket = (userId) => {
    socket = io.connect(import.meta.env.VITE_API_URL)

    socket.on("connect", () => {
        if (userId) {
            socket.emit("user_connected", userId);
        }

        socket.on('user_status_change', (data) => {
            const { userId, status } = data;
            store.dispatch(addUserId(userId))
            store.dispatch(addStatus(status))
        });
    });

    socket.on("new_message", (res) => {
        store.dispatch(addMessage(res))
    });
}

export { socket, initSocket }