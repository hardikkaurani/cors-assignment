import { io } from "socket.io-client"

const token = localStorage.getItem("token")

const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:5000", {
  auth: {
    token: token
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
})

export default socket
