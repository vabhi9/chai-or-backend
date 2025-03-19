import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";
// import "dotenv/config";

dotenv.config({
  path: "./env",
});

// const app = express()

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is Running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MONGODB Connection Failed!!! : ${err}`);
  });
