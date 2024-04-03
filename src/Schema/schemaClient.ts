import * as yup from "yup";

export class ValidatorClient {
  static registerClientValidator = yup.object({
    name: yup.string().required(),
    email: yup
      .string()
      .email().required(),
    password: yup.string().min(8).required(),
  });

  static loginClientValidator = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  static updateClientValidator = yup.object({
    name: yup.string().optional(),
    username: yup.string().optional(),
    password: yup.string().min(8).optional(),
  });
}
