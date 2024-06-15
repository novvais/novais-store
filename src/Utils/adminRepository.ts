import { AppDataSource } from "../data-source";
import { Admin } from "../Model/Admin";

export const adminRepository = AppDataSource.getRepository(Admin);
