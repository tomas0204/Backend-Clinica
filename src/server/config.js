import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import "./dbConfig.js";
import historialRoutes from "./routes/historial.routes.js";

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        const __dirname = dirname(fileURLToPath(import.meta.url));

        this.app.use(cors({
            origin: 'https://clinica-eight-beryl.vercel.app', 
            methods: ['GET','POST','PUT','DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }));

        this.app.options('*', cors());

        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(express.static(__dirname + "/../../public"));
    }
    routes() {
        this.app.use("/api/historial", historialRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.info(`El servidor se está ejecutando en: http://localhost:${this.port}`);
        });
    }
}

