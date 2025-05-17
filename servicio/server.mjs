import { app, server } from "./app.mjs";

const port = 3000

/* app.listen(port, () => {
    console.log(`Servidor corriendo en localhost:${port}`)
}) */

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en localhost:${port}`);
});