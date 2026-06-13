import io from "socket.io-client"

let socket

const initSocket = ()=>{
    socket = io.connect(import.meta.env.VITE_API_URL)

    socket.on("join_room", (res)=>{
        console.log(res)
    })
}

export {socket, initSocket}