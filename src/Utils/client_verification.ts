import { AppDataSource } from "../data-source";
import { Client_Verification } from "../Model/Client_Verification";

export const client_verificationRepository =
  AppDataSource.getRepository(Client_Verification);
