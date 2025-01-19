import { Router } from "express";

const albumRoutes = Router();

albumRoutes.get("/", (req,res) => {
    res.send("admin routes")
})

export default albumRoutes;