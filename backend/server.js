const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/predict", require("./routes/predictRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// Health check
app.get("/", (req, res) => res.json({ message: "DiabetesCare API running ✓" }));

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`));