import dotenv from "dotenv";
import connectDB from "./src/config/dbConfig.js";
import Server from "./src/config/config.js";


dotenv.config();

const start = async () => {
  try {
    await connectDB();
    const server = new Server();
    server.listen();
  } catch (error) {
    console.error("Error al iniciar:", error);
  }
};

start();