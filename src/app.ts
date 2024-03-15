import "express-async-errors";
import express from "express";
import { router } from "./Routes/routes";
import { errorMiddleware } from "./Middleware/error";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
    this.server.use(errorMiddleware);
  }

  private router() {
    this.server.use(router);
  }
}
