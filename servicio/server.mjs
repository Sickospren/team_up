import app from "./app.mjs"
import cors from 'cors';

const port = 3000

app.use(cors());

app.listen(port, () => {
    console.log(`Servidor corriendo en localhost:${port}`)
})