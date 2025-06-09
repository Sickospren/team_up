import { app, server } from "./app.mjs";

const port = 3000

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en localhost:${port}`);
});