import { BadRequestError, NotFoundError } from "../Helpers/api-erros";
import { knex } from "../Connection/knex";
import jwt from "jsonwebtoken";
import { Verify } from "../Helpers/bcrypt";
import { At } from "../Helpers/date";

interface RegisterAdm {
  name: string;
  cpf: string;
  username: string;
  password: string;
}

interface LoginAdm {
  cpf: string;
  password: string;
}

interface UpdateAdm {
  name?: string;
  cpf?: string;
  username?: string;
  password?: string;
}

export class AdmService {
  static async registerAdmService(payload: RegisterAdm) {
    const admValidate = await knex("admin")
      .where({ cpf: payload.cpf })
      .whereNot({ deleted_at: null })
      .first();

    if (admValidate) {
      throw new BadRequestError("CPF already registered");
    }

    const encryptedPassword = await Verify.encryptedPass(payload.password);

    const admData = await knex("users")
      .insert({
        name: payload.name,
        cpf: payload.cpf,
        username: payload.username,
        password: encryptedPassword,
      })
      .returning("*");

    if (!admData) {
      throw new BadRequestError("Unable to register admin.");
    }
  }

  static async loginAdmService(payload: LoginAdm) {
    const admValidate = await knex("admins")
      .where({ cpf: payload.cpf })
      .whereNot({ deleted_at: null })
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

    const token = jwt.sign({ id: admValidate.id }, process.env.JW_SECRET, {
      expiresIn: "8h",
    });

    const { password: _, ...loginAdm } = admValidate;

    const data = { ...loginAdm, token };

    return data;
  }

  static async updateAdmService(payload: UpdateAdm, id: number) {
    const admValidate = await knex("admin")
      .where({ cpf: payload.cpf })
      .whereNot({ deleted_at: null })
      .first();

    if (admValidate) {
      throw new BadRequestError("CPF already registered");
    }

    const encryptedPassword = await Verify.encryptedPass(payload.password);

    const admDataU = await knex("users")
      .where({ id })
      .update({
        name: payload.name,
        cpf: payload.cpf,
        username: payload.username,
        password: encryptedPassword,
      })
      .returning("*");

    if (!admDataU) {
      throw new BadRequestError("Unable to register admin.");
    }
  }

  static async detailAdmService(id: number) {
    const admValidate = await knex("admin")
      .where({ id })
      .whereNot({ deleted_at: null })
      .first();

    if (!admValidate) {
      throw new NotFoundError("User not found.");
    }

    return admValidate;
  }

  static async deleteAdmService(id: number) {
    await At.deleteAt("admins", id);
  }
}
