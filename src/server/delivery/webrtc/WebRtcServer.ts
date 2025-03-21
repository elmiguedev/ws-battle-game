import "./PeerJsPlugin";

import Peer, { DataConnection } from "peerjs";
import { Server } from "node:http";
import type { Game } from "../../core/Game";
import type { ActionProvider } from "../providers/ActionProvider";
import { ExpressPeerServer, PeerServer, type IClient } from "peer";
import { GameStateNotifier } from "./notifiers/GameStateNotifier";
import { PlayerDisconnectNotifier } from "./notifiers/PlayerDisconnectNotifier";
import { PlayerItemNotifier } from "./notifiers/PlayerItemNotifier";
import type { WebRtcMessage } from "./WebRtcMessage";
import type { ApiServer } from "../api/ApiServer";

export class WebRtcServer {
  private peerServer: any;
  private peer: Peer;
  private clients: Record<string, IClient> = {};
  private connections: Record<string, DataConnection> = {};

  constructor(
    private readonly apiServer: ApiServer,
    private readonly game: Game,
    private readonly actionProvider: ActionProvider
  ) {
    const actions = this.actionProvider.PlayerActions;

    // crea el servidor peers el cual los coordina
    this.peerServer = ExpressPeerServer(this.apiServer.getServer(), {
      path: '/',
    });

    this.apiServer.getApp().use('/peer', this.peerServer);

    this.peerServer.on('connection', (client: IClient) => {
      console.log(`👤 Cliente conectado: ${client.getId()}`)
      this.clients[client.getId()] = client;

    });

    // crea el master peer, para mandar mensajes
    this.peer = new Peer("master", { host: "localhost", port: 3000, path: '/peer', pingInterval: 5000 });
    this.peer.on('open', () => {
      console.log("🧙 master peer abierto");
    });

    this.peer.on('connection', (conn) => {
      console.log("🧙 Nueva conexion con master ", conn.peer);
      this.connections[conn.peer] = conn;

      actions.create.execute({
        id: conn.peer,
        name: `${conn.metadata.name}` || `Player`
      });

      conn.on('data', (data) => {
        const message = data as WebRtcMessage;

        if (message.type === 'move') {
          actions.move.execute(conn.peer, message.data);
        }

        if (message.type === 'attack') {
          actions.attack.execute({
            playerId: conn.peer,
            enemyId: message.data
          })
        }

      });

    });



    this.peerServer.on('disconnect', (client: IClient) => {
      console.log(`💂‍♂️ Cliente desconectado: ${client.getId()}`);
      delete this.connections[client.getId()];
      delete this.clients[client.getId()];
      actions.disconnect.execute(client.getId());
    });

    const gameStateNotifier = GameStateNotifier(this);
    const playerDisconnectNotifier = PlayerDisconnectNotifier(this);
    const playerItemNotifier = PlayerItemNotifier(this);

    this.game.addGameStateListener(gameStateNotifier);
    this.game.addPlayerDisconnectListener(playerDisconnectNotifier);
    this.game.addPlayerItemListener(playerItemNotifier);

  }

  public broadcast(type: string, data: any) {
    Object.keys(this.connections).forEach((clientId) => {
      const conn = this.connections[clientId];
      if (conn) {
        conn.send({ type, data });
      }
    });
  }
}