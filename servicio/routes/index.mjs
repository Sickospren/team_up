import express from "express"
import router_usuario from "./router_usuario.mjs"

const hello = async(req, res) =>{
    res.json({"app": "hello world"});
}

const router = express.Router()

router.use("/usuario", router_usuario)

export default router





