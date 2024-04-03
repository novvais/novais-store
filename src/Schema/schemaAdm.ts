import * as yup from "yup";

export class ValidatorAdm {
  static registerAdmValidator = yup.object({
    name: yup.string().required(),
    cpf: yup
      .string()
      .matches(/^\d{11}$/)
      .required(),
    username: yup.string().required(),
    password: yup.string().min(8).required(),
  });

  static loginAdmValidator = yup.object({
    cpf: yup.string().required(),
    password: yup.string().required(),
  });

  static updateAdmValidator = yup.object({
    name: yup.string().optional(),
    cpf: yup
      .string()
      .matches(/^\d{11}$/)
      .optional(),
    username: yup.string().optional(),
    password: yup.string().min(8).optional(),
  });
}
