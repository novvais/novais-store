import "express-async-errors";
import express from "express";
import { router } from "./Routes/routes";
import { errorMiddleware } from "./Middleware/error";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    class App {
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

    new App().server.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log(error);
  });
