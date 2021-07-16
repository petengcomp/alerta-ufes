import socketIOClient from "socket.io-client";

// const socket = socketIOClient("localhost:3333");
const socket = socketIOClient("alerta-ufes-api.herokuapp.com");

export default socket;