# 🧠 Team UP – Backend API

Este es el backend de **Team UP**, una plataforma para gamers que permite conectar usuarios con gustos y niveles similares.  
Construido con **Node.js + Express** y una base de datos relacional **MySQL**, proporciona endpoints seguros y escalables para gestionar usuarios, chats, juegos, guías, comunidades y más.

## 🚀 Características principales

- 🔐 **Autenticación JWT** con estrategia `Passport-JWT`.
- 👤 **Gestión de usuarios**: Registro, login, perfil, niveles, intereses.
- 🕹️ **Gestión de juegos**: Listado de juegos, favoritos por usuario, filtros por género y tipo.
- 💬 **Sistema de chat en tiempo real** (integrado con frontend vía Socket.io).
- 👥 **Comunidades y equipos**: Crear, unirse, administrar.
- 📚 **Guías competitivas**: Crear, consultar y valorar guías de juego.
- 📊 **Relaciones en base de datos** bien definidas mediante claves foráneas.

## 🛠️ Tecnologías utilizadas

- **Node.js + Express**: Framework backend rápido y minimalista.
- **MySQL**: Base de datos relacional robusta.
- **JWT**: Autenticación basada en tokens.
- **Passport**: Middleware de autenticación con estrategia JWT.
- **Socket.io**: Comunicación en tiempo real para chats (coordinado con frontend).

## 📦 Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Sickospren/team_up.git
   cd team_up
   
2. Instalar dependencias:
   ```bash
   npm install

3. Configura el archivo .env

4. Ejecutar el servidor:
   ```bash
    cd .\servicio\
    node --watch .\server.mjs

## 🌐 Pruébalo
- 👉 http://sicko.vps.webdock.cloud/
