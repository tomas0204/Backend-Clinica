import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import apiRoutes from "../routes/index.routes.js";



export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.app.use(express.static(join(__dirname, "../../public")));
  }

  routes() {
    this.app.use("/api", apiRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `🚀 Servidor ejecutándose en: http://localhost:${this.port}`
      );
    });
  }
}