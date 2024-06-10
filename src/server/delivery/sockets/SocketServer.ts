import { Server } from "node:http";
import { Server as SocketIoServer } from "socket.io";
import type { Game } from "../../core/Game";
import type { ActionProvider } from "../providers/ActionProvider";
import { PlayerDisconnectHandler } from "./handlers/PlayerDisconnectHandler";
import { GameStateNotifier } from "./notifiers/GameStateNotifier";
import { PlayerAttackHandler } from "./handlers/PlayerAttackHandler";
import { PlayerMoveHandler } from "./handlers/PlayerMoveHandler";


export class SocketServer {
  private socketServer: SocketIoServer;

  constructor(
    private readonly server: Server,
    private readonly game: Game,
    private readonly actionProvider: ActionProvider
  ) {
    const actions = this.actionProvider.PlayerActions;

    this.socketServer = new SocketIoServer(server, {
      cors: { origin: "*" }
    });

    this.socketServer.on("connection", (socket) => {
      actions.create.execute(socket.id);

      const playerMoveHandler = PlayerMoveHandler(socket, actions.move);
      const playerAttackHandler = PlayerAttackHandler(socket, actions.attack);
      const playerDisconnectHandler = new PlayerDisconnectHandler(socket, actions.disconnect);

      socket.on("disconnect", playerDisconnectHandler.handle.bind(playerDisconnectHandler));
      socket.on("move", playerMoveHandler.handle);
      socket.on("attack", playerAttackHandler.handle);

      const gameStateNotifier = new GameStateNotifier(this.socketServer);

      game.addGameStateListener(gameStateNotifier); // meter este notifier en el interactionProvider
    });
  }
}