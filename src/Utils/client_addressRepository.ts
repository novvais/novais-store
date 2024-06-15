import { AppDataSource } from "../data-source";
import { Client_Address } from "../Model/Client_Address";

export const client_addressRepository = AppDataSource.getRepository(Client_Address);
