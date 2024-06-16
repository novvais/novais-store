import * as yup from "yup";

export class ValidatorClient {
  static registerClientValidator = yup.object({
    name: yup.string().required(),
    email: yup
      .string()
      .email().required(),
      cpf: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .required(),
    password: yup.string().min(8).required(),
    phone: yup.string().matches(/^\([1-9]{2}\) [9] [6-9]{1}[0-9]{3}\-[0-9]{4}$/).required(),
    birth_date: yup.date().required()
  });

  static loginClientValidator = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  static updateClientValidator = yup.object({
    name: yup.string().optional(),
    email: yup
      .string()
      .email().optional(),
      cpf: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .optional(),
    password: yup.string().min(8).optional(),
    phone: yup.string().matches(/^\([1-9]{2}\) [9] [6-9]{1}[0-9]{3}\-[0-9]{4}$/).optional(),
    birth_date: yup.date().optional()
  });
}
