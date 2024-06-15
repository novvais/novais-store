import { AppDataSource } from "../data-source";
import { File } from "../Model/Files";

export const fileRepository = AppDataSource.getRepository(File);
