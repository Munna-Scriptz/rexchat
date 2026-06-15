import io from "socket.io-client"
import { store } from "../redux/store"
import { addMessage } from "../redux/slices/messagesSlice"

let socket

const initSocket = () => {
    socket = io.connect(import.meta.env.VITE_API_URL)

    socket.on("new_message", (res) => {
        console.log(res)
        store.dispatch(addMessage(res))
    })
}

export { socket, initSocket }