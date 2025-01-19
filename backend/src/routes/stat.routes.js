import { Router } from "express";

const statRoutes = Router();

statRoutes.get("/", (req,res) => {
    res.send("admin routes")
})

export default statRoutes;