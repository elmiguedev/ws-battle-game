import { Server } from "node:http";
import { Server as SocketIoServer } from "socket.io";
import type { Game } from "../../core/Game";
import type { ActionProvider } from "../providers/ActionProvider";
import { PlayerDisconnectHandler } from "./handlers/PlayerDisconnectHandler";
import { GameStateNotifier } from "./notifiers/GameStateNotifier";
import { PlayerAttackHandler } from "./handlers/PlayerAttackHandler";
import { PlayerMoveHandler } from "./handlers/PlayerMoveHandler";
import { PlayerDisconnectNotifier } from "./notifiers/PlayerDisconnectNotifier";
import { PlayerItemNotifier } from "./notifiers/PlayerItemNotifier";


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
      const queryData = socket.handshake.query;
      actions.create.execute({
        id: socket.id,
        name: `${queryData.name}` || `Player`
      });

      const playerMoveHandler = PlayerMoveHandler(socket, actions.move);
      const playerAttackHandler = PlayerAttackHandler(socket, actions.attack);
      const playerDisconnectHandler = PlayerDisconnectHandler(socket, actions.disconnect);

      socket.on("disconnect", playerDisconnectHandler.handle);
      socket.on("move", playerMoveHandler.handle);
      socket.on("attack", playerAttackHandler.handle);

      const gameStateNotifier = GameStateNotifier(this.socketServer);
      const playerDisconnectNotifier = PlayerDisconnectNotifier(this.socketServer);
      const playerItemNotifier = PlayerItemNotifier(this.socketServer);

      // meter este notifier en el interactionProvider
      game.addGameStateListener(gameStateNotifier);
      game.addPlayerDisconnectListener(playerDisconnectNotifier);
      game.addPlayerItemListener(playerItemNotifier);

    });
  }
}