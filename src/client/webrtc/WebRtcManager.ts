import type { GameSceneEntities } from "../scenes/GameSceneEntities";
import type { Scene } from "phaser";
import type { GameSceneHud } from "../huds/GameSceneHud";
import type { CommunicationManager } from "../CommunicationManager";
import Peer, { DataConnection } from "peerjs";
import type { WebRtcMessage } from "./WebRtcMessage";
import type { GameState } from "../sockets/states/GameState";
import { Player } from "../entities/Player";
import { HealItem } from "../entities/HealItem";
import type { ItemState } from "../../server/core/states/ItemState";

export class WebRtcManager implements CommunicationManager {
  private peer: Peer;
  private conn: DataConnection;

  constructor(private readonly scene: Scene, private readonly entities: GameSceneEntities, private readonly hud: GameSceneHud, sceneData: any) {
    this.peer = new Peer(Math.random().toString(36).substring(2, 9), {
      host: 'localhost',
      port: 3000,
      path: '/peer',
    });

    this.peer.on('open', (id) => {
      console.log('Conectado al server: ' + id);
    });

    this.conn = this.peer.connect("master", { metadata: { name: sceneData.name } });
    this.conn.on('open', () => {
      console.log('Conectado al master');
    });
    this.conn.on('data', (data) => {
      const message = data as WebRtcMessage;
      this.onMessage(message);
    });
  }

  public destroy() {
    this.conn.close();
    this.peer.destroy();
  }

  public emit(event: string, data?: any) {
    const message: WebRtcMessage = {
      type: event,
      data
    }
    this.conn.send(message)
  }

  private onMessage(message: WebRtcMessage) {
    switch (message.type) {
      case 'game_state':
        this.onGameState(message.data);
        break;
      case 'player_disconnect':
        this.onPlayerDisconnected(message.data);
        break;
      case 'item_collected':
        this.onItemCollected(message.data);
        break;
    }
  }

  private onGameState(state: GameState) {
    if (this.hud) {
      this.hud.updateState(state);
    }
    Object.keys(state.players).forEach((playerId: string) => {
      const playerState = state.players[playerId];
      if (playerState.id === this.peer.id) {
        if (this.entities.mainPlayer) {
          this.entities.mainPlayer.setPlayerState(playerState);
        } else {
          this.entities.mainPlayer = new Player(this.scene, playerState.x, playerState.y);
          this.scene.cameras.main.startFollow(this.entities.mainPlayer);
          this.hud.setMainPlayer(this.entities.mainPlayer);
        }
      } else {
        if (this.entities.players[playerState.id]) {
          this.entities.players[playerState.id].setPlayerState(playerState);
        } else {
          this.entities.players[playerState.id] = new Player(this.scene, playerState.x, playerState.y);
        }
      }
    })

    // pone los items
    Object.keys(state.items).forEach((itemId: string) => {
      const item = state.items[itemId];
      if (!this.entities.items[itemId]) {
        this.entities.items[itemId] = new HealItem(
          this.scene,
          item.x,
          item.y
        )
      }
    })
  }

  private onPlayerDisconnected(id: string) {
    const player = this.entities.players[id];

    if (player) {
      player.destroy();
      delete this.entities.players[id];
    }
  }

  private onItemCollected(item: ItemState) {
    const itemEntity = this.entities.items[item.id];

    if (itemEntity) {
      itemEntity.destroy();
      delete this.entities.items[item.id];
    }
  }


}