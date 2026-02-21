import router from "./src/routes/index.routes.js"
import Server from "./src/server/config.js"
import router from "./src/routes/doctores.routes.js";

const server = new Server();
//escuche al puerto 
server.app.use("/api", router)

server.app.use("/api/doctores", router);

server.listen();
