import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import cron from "node-cron";
import { createServer } from "http";

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js"; // ✅ Authentication Router
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statRoutes from "./routes/stat.routes.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;
const httpServer = createServer(app);

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json()); // Parse JSON body
app.use(clerkMiddleware()); // Attach Clerk authentication to request

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
	})
);

// ✅ Clean temp directory every hour
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) return console.log("Error:", err);
			files.forEach((file) => fs.unlink(path.join(tempDir, file), () => {}));
		});
	}
});

// ✅ Use Authentication Router
app.use("/api/auth", authRoutes); // This handles all auth-related routes

// ✅ Other Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// ✅ Error Handler
app.use((err, req, res, next) => {
	res.status(500).json({
		message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
	});
});

httpServer.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	connectDB();
});
