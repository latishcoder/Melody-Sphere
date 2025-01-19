import { Router } from "express";

const songRoutes = Router();

songRoutes.get("/", (req,res) => {
    res.send("admin routes")
})

export default songRoutes;