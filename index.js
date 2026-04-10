import mainRouter from "./src/routes/index.routes.js";
import doctoresRouter from "./src/routes/doctores.routes.js";
import Server from "./src/server/config.js";

const server = new Server();

// rutas
server.app.use("/api", mainRouter);
server.app.use("/api/doctores", doctoresRouter);

server.listen();
