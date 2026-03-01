import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import apiRoutes from "../routes/index.routes.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3001;

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
    const startListening = (portToUse) => {
      const server = this.app.listen(portToUse, () => {
        console.log(`Servidor ejecutándose en: http://localhost:${portToUse}`);
      });

      server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
          const nextPort = Number(portToUse) + 1;
          console.warn(
            `Puerto ${portToUse} en uso. Reintentando en puerto ${nextPort}...`
          );
          startListening(nextPort);
          return;
        }

        console.error("Error al iniciar el servidor:", error);
      });
    };

    startListening(this.port);
  }
}
