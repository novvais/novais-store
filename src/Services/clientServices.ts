import { BadRequestError, NotFoundError } from "../Helpers/api-erros";
import { knex } from "../Connection/knex";
import jwt from "jsonwebtoken";
import { Verify } from "../Helpers/bcrypt";

interface RegisterClient {
  name: string;
  email: string;
  password: string;
}

interface LoginClient {
  email: string;
  password: string;
}

interface UpdateClient {
  name?: string;
  email?: string;
  password?: string;
}

export class ClientService {
  static async registerClientService(payload: RegisterClient) {
    const client = await knex("users")
      .where({ email: payload.email })
      .whereNot({ deleted_at: null })
      .first();

    if (client) {
      throw new BadRequestError("E-mail already registered");
    }

    const encryptedPassword = await Verify.encryptedPass(payload.password);

    const clientData = await knex("users")
      .insert({
        name: payload.name,
        email: payload.email,
        password: encryptedPassword,
        created_at: new Date()
      })
      .returning("*");

    if (!clientData) {
      throw new BadRequestError("Unable to register user.");
    }
  }

  static async LoginClientService(payload: LoginClient) {
    const validateClient = await knex("users")
      .where({ email: payload.email })
      .whereNot({ deleted_at: null })
      .first();

    if (!validateClient) {
      throw new NotFoundError("Invalid email and/or password.");
    }

    const validPassword = await Verify.compareLogin(
      payload.password,
      validateClient.password
    );

    if (!validPassword) {
      throw new BadRequestError("Invalid email and/or password.");
    }

    const token = jwt.sign({ id: validateClient.id }, "senhaSegura", {
      expiresIn: "8h",
    });

    const { password: _, ...loginClient } = validateClient;

    const data = { ...loginClient, token };

    return data;
  }

  static async updateClientService(payload: UpdateClient, id: number) {

    if (payload.email) {
      const validateCpf = await knex("users")
      .where({ email: payload.email })
      .whereNot({ id })
      .whereNot({ deleted_at: null })
      .first();

      if (validateCpf) {
        throw new BadRequestError("Email already registered");
      }
    }

    const detailUser = await knex("users")
      .where({ id })
      .whereNot({ deleted_at: null })
      .first();
    
    let encryptedPassword: string | undefined;

    if (payload.password) {
      encryptedPassword = await Verify.encryptedPass(payload.password);
    }

    const updatedClient = await knex("users")
      .where({ id })
      .whereNot({ deleted_at: null })
      .update({
        name: payload.name || detailUser.name,
        email: payload.email || detailUser.email,
        password: encryptedPassword || detailUser.password,
        updated_at: new Date()
      });

    if (!updatedClient) {
      throw new BadRequestError("Unable to update user");
    }
  }

  static async detailClientService(id: number) {
    const client = await knex("users").where({ id }).first();

    if (!client) {
      throw new NotFoundError("User not found.");
    }

    return client
  }

  static async deleteClientService(id: number) {
    await knex("clients").where({ id }).update({ deleted_at: new Date() })
  }
}
