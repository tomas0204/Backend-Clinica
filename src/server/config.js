import express from "express"
import cors from "cors"
import morgan from "morgan"
import { dirname } from "path"
import { fileURLToPath } from "url"
import "./dbConfig.js"
import historialRoutes from "./...routes/historial.routes.js";

export default class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3001
        //ejecuta el metodo middlewares
        this.middlewares()
        this.routes();
        routes(); {
            this.app.use("/api/historial", historialRoutes);
        }


    }
    middlewares() {
        //invocar a una de nuestro objero (THIS)
        this.app.use(cors()) //permite conexiones remotas cunado lo tengamos en produccion
        this.app.use(express.json()) //permite interpretar los datos que lleguen en la solicitud en formato json
        this.app.use(morgan("dev")) //nos da info extra en la terminal 

        const __dirname = dirname(fileURLToPath(import.meta.url))
        this.app.use(express.static(__dirname + "/../../public"))


    }

    listen() {
        this.app.listen(this.port, () => {
            console.info(`El servidor se está ejecutando en: ${this.port}`)
        })
    }

}