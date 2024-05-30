import { knex } from "../Connection/knex";
import { IRegisterAdress, IUpdateAdress } from "../interfaces/interfaceUserAdress";

export class UserAdressService {
  static async registerAdressService(payload: IRegisterAdress) {
    //APOS O CLIENTE COLOCAR O CEP COMO FAZER PARA PREENCHER TUDO AUTOMATICAMENTE
  }

  static async updateAdressService(payload: IUpdateAdress) {
    
  }
}
