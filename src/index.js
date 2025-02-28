import connectDB from "./db/index.js";
import dotenv from "dotenv";
// import "dotenv/config";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is Running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MONGODB Connection Failed!!! : ${err}`);
  });
