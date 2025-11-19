import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import {
  bienvenida,
  registrarUsuario,
  obtenerUsuarios,
  enviarMensajeGrupal,
  enviarMensajePrivado
} from "./Funciones.js";

const app = express();
app.use(cors());
app.use(express.json());

// Crear servidor HTTP para que Socket.IO funcione
const server = http.createServer(app);

// Crear instancia de Socket.IO
const io = new Server(server, {
  cors: { origin: "*" }
});

// Conexión de usuarios vía WebSocket
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Registrar usuario
  socket.on("registrar", (nombre) => {
    registrarUsuario(socket.id, nombre);
    io.emit("usuarios_conectados", obtenerUsuarios());
  });

  // Chat grupal
  socket.on("mensaje_grupal", (data) => {
    enviarMensajeGrupal(io, data);
  });

  // Chat privado
  socket.on("mensaje_privado", (data) => {
    enviarMensajePrivado(io, data);
  });

  // Cuando el usuario se desconecta
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  bienvenida();
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
