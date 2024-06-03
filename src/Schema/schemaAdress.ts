import * as yup from "yup";

export class ValidatorAdress {
  static registerAdressValidator = yup.object({
    user_id: yup.number().required(),
    cep: yup
      .string()
      .matches(/^\d{8}$/)
      .required(),
    logadouro: yup.string().required(),
    complemento: yup.number().optional(),
    bairro: yup.string().optional(),
    localidade: yup.string().required(),
    uf: yup.string().required(),
  });

  static updateAdressValidator = yup.object({
    user_id: yup.number().optional(),
    cep: yup
      .string()
      .matches(/^\d{8}$/)
      .optional(),
    logadouro: yup.string().optional(),
    complemento: yup.number().optional(),
    bairro: yup.string().optional(),
    localidade: yup.string().optional(),
    uf: yup.string().optional(),
  });
}
