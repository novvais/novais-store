import vine from "@vinejs/vine";
import { uniqueRule } from "../Rules/unique";

export class ValidatorAdm {
  static registerAdmValidator = vine.object({
    name: vine.string(),
    cpf: vine
      .string()
      .regex(/^\d{11}$/)
      .use(uniqueRule({ table: "admins", column: "cpf" })),
    username: vine.string(),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  });

  static loginAdmValidator = vine.object({
    cpf: vine.string(),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  });

  static updateAdmValidator = vine.object({
    name: vine.string().optional(),
    cpf: vine
      .string()
      .regex(/^\d{11}$/)
      .optional(),
    username: vine.string().optional(),
    password: vine.string().minLength(8).maxLength(32).confirmed().optional(),
  });
}
