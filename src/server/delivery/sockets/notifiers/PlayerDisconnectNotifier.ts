import type { Server } from "socket.io";
export const PlayerDisconnectNotifier = (serverSocket:Server) => {
  return {
    notify: (id:string) => {
      serverSocket.emit("player_disconnect", id);
    }
  }
}