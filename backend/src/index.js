import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'
import path from "path"
import cors from "cors"
import fileupload from "express-fileupload"
import userroutes from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import authRouter from "./routes/auth.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statRoutes from "./routes/stat.routes.js";
import songRoutes from "./routes/song.routes.js";

dotenv.config()

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
app.use(express.json());
app.use(clerkMiddleware())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true,
    limits:{
        fileSize: 10 * 1024 * 1024,
    },
}));

app.use("/api/users", userroutes)
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/album", albumRoutes)
app.use("/api/song", songRoutes)
app.use("/api/stat", statRoutes)

// error handler
app.use((err, req, res, next) => {
	res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB()
})
