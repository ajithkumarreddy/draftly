import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import next from "next";
import connectDB from "./config/db";
import documentRoutes from "./routes/documentRoutes";

// Load environment variables
dotenv.config({ path: './.env.local' });

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', documentRoutes);

const PORT = process.env.PORT || 5001;
nextApp.prepare().then(() => {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Export the app for external use (e.g., for testing)
export default app;