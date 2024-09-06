import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import converstionRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
console.log(process.env.MONGO);
const app = express();
mongoose.set("strictQuery", true);

const connectMongodb = async () => {

  try {
    await mongoose.connect("mongodb+srv://testing123:sihtesting@freelancing-website.b8a5f.mongodb.net/?retryWrites=true&w=majority&appName=Freelancing-Website", {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log("Connected Successfully!");
  } catch (error) {
    console.error(error);
  }
};

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Handle preflight requests
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversation", converstionRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!🤔";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8000, () => {
  connectMongodb();
  console.log(`Server running on port http://localhost:${8000}`);
});
