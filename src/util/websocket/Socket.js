import { io } from "socket.io-client";
import { toast } from "react-toastify";

const connectWebSocket = (userId) => {
  const url = import.meta.env.VITE_BACKEND_WEBSOCKET_URI;
  const socket = io(url, {
    withCredentials: true,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");

    socket.emit("register", userId);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });

  socket.on("notification", (e) => {
    toast.info(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });

  return socket;
};

export { connectWebSocket };
