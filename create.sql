-- Borrar las tablas existentes en orden correcto (de más dependientes a menos)
DROP TABLE IF EXISTS usuarios_amistades;
DROP TABLE IF EXISTS solicitudes_amistad;
DROP TABLE IF EXISTS mensajes;
DROP TABLE IF EXISTS chat_usuario;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS usuarios_juego;
DROP TABLE IF EXISTS guias;
DROP TABLE IF EXISTS juegos;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS categorias;

-- Crear la base de datos y seleccionarla
USE team_up;

-- Tabla: categorias
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla: usuario 
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_oauth VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(255) NOT NULL,
    nombre_usuario_app VARCHAR(255),
    avatar VARCHAR(255) NOT NULL,
    proveedor VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    fecha_registro DATE NOT NULL,
    administrador TINYINT(1) NOT NULL DEFAULT 0
);

-- Tabla: juegos
CREATE TABLE juegos (
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    banner VARCHAR(500),
    foto_juego VARCHAR(500),
    dispositivos VARCHAR(50),
    id_categoria INT NOT NULL,
    rangos JSON,
    borrado TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
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
    descripcion VARCHAR(255),
    id_juego INT,
    user_admin INT NOT NULL,
    comunidad TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (id_juego) REFERENCES juegos(id_juego),
    FOREIGN KEY (user_admin) REFERENCES usuario(id_usuario)
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
    id_chat INT NOT NULL,
    id_usuario INT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_mensaje DATETIME NOT NULL,
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat),
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
