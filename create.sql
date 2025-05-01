CREATE DATABASE team_up;
USE team_up;

-- Tabla: usuario Modificada para logins usando OAUTH2
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    proveedor VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    fecha_registro DATE NOT NULL,
    fecha_nac DATE NOT NULL
);

-- Tabla: juegos
CREATE TABLE juegos (
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    dispositivos VARCHAR(50),
    rangos JSON
);

-- Tabla: usuarios_juego
CREATE TABLE usuarios_juego (
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    game_tag VARCHAR(20) UNIQUE NOT NULL,
    datos_extra_juego JSON,
    PRIMARY KEY (id_usuario, id_juego),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_juego) REFERENCES juegos(id_juego)
);

-- Tabla: chat
CREATE TABLE chat (
    id_chat INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
);

-- Tabla: chat_usuario
CREATE TABLE chat_usuario (
    id_chat INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_union DATE NOT NULL,
    PRIMARY KEY (id_chat, id_usuario),
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla: mensajes
CREATE TABLE mensajes (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_sala INT NOT NULL,
    id_usuario INT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_mensaje DATETIME NOT NULL,
    FOREIGN KEY (id_sala) REFERENCES chat(id_chat),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla: solicitudes_amistad
CREATE TABLE solicitudes_amistad (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
    id_remitente INT NOT NULL,
    id_destinatario INT NOT NULL,
    estado ENUM('pendiente', 'aceptada', 'cancelada') NOT NULL,
    fecha_solicitud DATE NOT NULL,
    FOREIGN KEY (id_remitente) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_destinatario) REFERENCES usuario(id_usuario),
    UNIQUE (id_remitente, id_destinatario)
);

-- Tabla: usuarios_amistades
CREATE TABLE usuarios_amistades (
    id_usuario_1 INT NOT NULL,
    id_usuario_2 INT NOT NULL,
    fecha_amistad DATE NOT NULL,
    PRIMARY KEY (id_usuario_1, id_usuario_2),
    FOREIGN KEY (id_usuario_1) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_usuario_2) REFERENCES usuario(id_usuario),
    CHECK (id_usuario_1 < id_usuario_2)
);

-- Tabla: guias
CREATE TABLE guias (
    id_guia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    contenido_guia JSON,
    fecha DATE NOT NULL,
    privada BOOLEAN NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_juego) REFERENCES juegos(id_juego)
);

-- Tabla: comunidades
CREATE TABLE comunidades (
    id_comunidad INT AUTO_INCREMENT PRIMARY KEY,
    id_juego INT NOT NULL,
    id_chat_comunidad INT NOT NULL,
    FOREIGN KEY (id_juego) REFERENCES juegos(id_juego),
    FOREIGN KEY (id_chat_comunidad) REFERENCES chat(id_chat)
);
