import { Router } from "express";

const userroutes = Router();

userroutes.get("/", (req,res) => {
    res.send("user routes with get method")
})

export default userroutes;