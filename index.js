import Server from "./src/server/config.js"
import router from "./src/routes/doctores.routes.js";
const server = new Server()

//escuche al puerto 

server.listen();

server.app.use("/api", router);