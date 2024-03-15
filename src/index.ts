import { App } from "./app"
import "dotenv/config"

new App().server.listen(process.env.PORT || 3000);

// Usar o Dino para roda TypeScript