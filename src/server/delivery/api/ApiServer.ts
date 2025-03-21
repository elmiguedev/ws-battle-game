import express, { type Application } from "express";
import { Server } from "node:http";
import PongHandler from "./handlers/PongHandler";
import type { ActionProvider } from "../providers/ActionProvider";
import path from "path";

export class ApiServer {
  private app: Application;

  constructor(
    private readonly server: Server,
    private readonly actionProvider: ActionProvider
  ) {
    this.app = express();
    this.server.addListener("request", this.app);

    this.app.get("/ping", PongHandler);
    this.app.use("/", express.static(path.join(__dirname, "../../../", "client/dist")));
  }

  public getApp() {
    return this.app;
  }

  public getServer() {
    return this.server;
  }


}