import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/", (req,res) => {
    res.send("admin routes")
})

export default adminRouter;