import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbconn.config.js";
import userRoutes from "./routes/userRoutes.route.js";
import authRoutes from "./routes/userAuthRoutes.route.js";
import corsOptions from "./config/corsOptions.config.js";

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(cors());
app.disable("x-powered-by"); // less hackers know about our stack

// api routes
// app.use("api", router);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

// http get request for root route
app.get("/", (req, res) => {
  res.status(200).json("Welcome to DoshBox API");
});

// start server only if mongo is connected
connectDB()
  .then(() => {
    try {
      console.log("connected to mongoose");
      app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      // console.log("cannot connect to the server");
      throw new Error(error);
    }
  })
  .catch((error) => {
    // console.log("Invalid database connection...!");
    throw new Error(error);
    // console.error(error.message);
  });
