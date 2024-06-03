import { knex } from "../Connection/knex";
import { CheckZipCode } from "../Helpers/checkZipCode";
import {
  IRegisterAdress,
  IUpdateAdress,
} from "../interfaces/interfaceUserAdress";

export class UserAdressService {
  static async registerAdressService(payload: IRegisterAdress) {
    const adress = await CheckZipCode.consultZipCode;

    if (!adress) {
      await knex("user_profile").insert({
        user_id: payload.user_id,
        cep: payload.cep,
        adress: payload.logadouro,
        complement: payload.complemento,
        district: payload.bairro,
        state: payload.localidade,
        city: payload.uf,
      });
    }

    await knex("user_adress").insert({});
  }

  static async updateAdressService(payload: IUpdateAdress) {}
}
