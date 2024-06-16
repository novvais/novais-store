import * as yup from "yup";

export class ValidatorAdm {
  static registerAdmValidator = yup.object({
    name: yup.string().required(),
    cpf: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .required(),
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
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .optional(),
    password: yup.string().min(8).optional(),
  });
}
