import express from "express"

const hello = async(req, res) =>{
    res.json({"app": "hello world"});
}

const router = express.Router()

router.use("/", hello)

export default router