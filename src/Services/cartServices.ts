import { BadRequestError, NotFoundError } from "../Helpers/api-erros";
import knex from "knex";

interface RegisterAdm {
    name: string;
    cpf: string;
    username: string;
    password: string;
  }
  
  interface UpdateAdm {
    name?: string;
    cpf?: string;
    username?: string;
    password?: string;
  }
  
