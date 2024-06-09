import { createServer } from "node:http";
import { Game } from "./core/Game";
import { ApiServer } from "./delivery/api/ApiServer";
import { SocketServer } from "./delivery/sockets/SocketServer";
import { ActionProvider } from "./delivery/providers/ActionProvider";

// 1. inicializa el core del juego
const game = new Game();
const actionProvider = new ActionProvider(game);

// 2. inicializa la capa de delivery
const server = createServer();
const apiServer = new ApiServer(server, actionProvider);
const socketServer = new SocketServer(server, game, actionProvider);

// 3. inicializa el servidor
server.listen((3000), () => {
  console.log("Listening on port 3000");
  game.start();
});



