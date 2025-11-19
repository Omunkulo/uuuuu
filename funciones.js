// Lista de usuarios conectados
// [{ id_socket: "...", nombre: "Juan" }]
const usuarios = [];

export const bienvenida = () => {
  console.log("Bienvenido al servidor de chat!");
};

// Registrar usuario nuevo
export const registrarUsuario = (id_socket, nombre) => {
  usuarios.push({ id_socket, nombre });
};

// Obtener lista de usuarios
export const obtenerUsuarios = () => {
  return usuarios;
};

// CHAT GRUPAL
export const enviarMensajeGrupal = (io, data) => {
  // data = { nombre, mensaje }
  io.emit("nuevo_mensaje_grupal", data);
};

// CHAT PRIVADO
export const enviarMensajePrivado = (io, data) => {
  // data = { para: socketID, mensaje, de: nombre }
  io.to(data.para).emit("nuevo_mensaje_privado", {
    mensaje: data.mensaje,
    de: data.de
  });
};
