import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log("MongoDB connection error:", err);
});