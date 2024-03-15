import vine from "@vinejs/vine";
import { uniqueRule } from "../Rules/unique";

export class ValidatorClient {
  static registerClientValidator = vine.object({
    name: vine.string(),
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: "clients", column: "email" })),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  });

  static loginClientValidator = vine.object({
    email: vine.string(),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  });

  static updateClientValidator = vine.object({
    name: vine.string().optional(),
    cpf: vine
      .string()
      .regex(/^\d{11}$/)
      .optional(),
    username: vine.string().optional(),
    password: vine.string().minLength(8).maxLength(32).confirmed().optional(),
  });
}
