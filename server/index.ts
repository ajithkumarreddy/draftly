const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const next = require("next");

dotenv.config({ path: './.env.local' });

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectDB() {
  try {
    await mongoose.connect(mongoURI, clientOptions);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

(async () => {
  await connectDB();
})();

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
