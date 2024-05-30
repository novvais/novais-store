import { knex } from "../Connection/knex";
import { BadRequestError, NotFoundError } from "../Helpers/api-erros";
import jwt from "jsonwebtoken";
import { Verify } from "../Helpers/bcrypt";
import { ILoginAdm, IRegisterAdm, IUpdateAdm } from "../interfaces/interfaceAdmin"


export class AdmService {
  static async registerAdmService(payload: IRegisterAdm) {
    const admValidate = await knex("admins")
      .where({ cpf: payload.cpf })
      .where({ deleted_at: null })
      .first();

    if (admValidate) {
      throw new BadRequestError("CPF already registered");
    }

    const encryptedPassword = await Verify.encryptedPass(payload.password);

    const admData = await knex("admins")
      .insert({
        name: payload.name,
        cpf: payload.cpf,
        username: payload.username,
        password: encryptedPassword,
        created_at: new Date(),
      })
      .returning("*");

    if (!admData) {
      throw new BadRequestError("Unable to register admin.");
    }
  }

  static async loginAdmService(payload: ILoginAdm) {
    const admValidate = await knex("admins")
      .where({ cpf: payload.cpf })
      .where({ deleted_at: null })
      .first();

    if (!admValidate) {
      throw new NotFoundError("Invalid CPF and/or password.");
    }

    const validPassword = await Verify.compareLogin(
      payload.password,
      admValidate.password
    );

    if (!validPassword) {
      throw new BadRequestError("Invalid username and/or password.");
    }

    const token = jwt.sign(
      { id: admValidate.id },
      process.env.JW_SECRET || "",
      {
        expiresIn: "8h",
      }
    );

    const { password: _, ...loginAdm } = admValidate;

    const data = { ...loginAdm, token };

    return data;
  }

  static async updateAdmService(payload: IUpdateAdm, id: number) {
    if (payload.cpf) {
      const validateCpf = await knex("admins")
        .where({ cpf: payload.cpf })
        .whereNot({ id })
        .where({ deleted_at: null })
        .first();

      if (validateCpf) {
        throw new BadRequestError("CPF already registered");
      }
    }

    if (payload.username) {
      const validateUsername = await knex("admins")
        .where({ username: payload.username })
        .whereNot({ id })
        .where({ deleted_at: null })
        .first();

      if (validateUsername) {
        throw new BadRequestError("Username already registered");
      }
    }

    const detailAdm = await knex("admins")
      .where({ id })
      .where({ deleted_at: null })
      .first();

    let encryptedPassword: string | undefined;

    if (payload.password) {
      encryptedPassword = await Verify.encryptedPass(payload.password);
    }

    const updateAdm = await knex("users")
      .where({ id })
      .where({ deleted_at: null })
      .update({
        name: payload.name || detailAdm.name,
        cpf: payload.cpf || detailAdm.cpf,
        username: payload.username || detailAdm.username,
        password: encryptedPassword || detailAdm.password,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updateAdm) {
      throw new BadRequestError("Unable to register admin.");
    }
  }

  static async detailAdmService(id: number) {
    const admValidate = await knex("admins")
      .select("name", "cpf")
      .where({ id })
      .where({ deleted_at: null })
      .first();

    if (!admValidate) {
      throw new NotFoundError("Admin not found.");
    }

    return 
  }

  static async deleteAdmService(id: number) {
    await knex("admins").where({ id }).update({ deleted_at: new Date() });
  }
}
