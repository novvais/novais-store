import "dotenv/config";
import { App } from "./app.ts";

new App().server.listen(process.env.PORT || 3000);

// Usar o Dino para roda TypeScript