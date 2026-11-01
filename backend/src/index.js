import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/database.js";

dotenv.config();

const port = Number(process.env.PORT) || 4000;

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Server could not start: ${error.message}`);
    process.exitCode = 1;
  }
}

startServer();
