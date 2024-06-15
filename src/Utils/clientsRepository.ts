import { AppDataSource } from "../data-source";
import { Client } from "../Model/Client";

export const clientRepository = AppDataSource.getRepository(Client);
