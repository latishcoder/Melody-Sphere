import { Router } from "express";
import { User } from "../models/user.model.js";
const authRouter = Router();

authRouter.post("/callback", async (req,res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        const user = await User.findOne({clerkId: id})
        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
            })
        }
        res.status(200).json({success:true})
    } catch (error) {
        console.log("Error in authCallback", error);
        res.status(500).json({message: "Internal Server Error", error})
        
    }
})

export default authRouter;