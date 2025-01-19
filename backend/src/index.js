import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";

import userroutes from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import authRouter from "./routes/auth.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statRoutes from "./routes/stat.routes.js";
import songRoutes from "./routes/song.routes.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/users", userroutes)
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/album", albumRoutes)
app.use("/api/song", songRoutes)
app.use("/api/stat", statRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB()
})
