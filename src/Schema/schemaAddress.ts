import * as yup from "yup";

export class ValidatorAdress {
  static registerWithCepValidator = yup.object({
    client_id: yup.number().required(),
    cep: yup
      .string()
      .matches(/^\d{8}$/)
      .required(),
    logadouro: yup.string().required(),
    complemento: yup.string().optional(),
    bairro: yup.string().optional(),
    localidade: yup.string().required(),
    uf: yup.string().required(),
  });

  static registerAddressValidator = yup.object({
    client_id: yup.number().required(),
    cep: yup
      .string()
      .matches(/^\d{8}$/)
      .required(),
    street: yup.string().required(),
    address: yup.string().required(),
    residencial_number: yup.string().required(),
    complement: yup.string().optional(),
    district: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
  });

  static updateAddressValidator = yup.object({
    client_id: yup.number().optional(),
    cep: yup
      .string()
      .matches(/^\d{8}$/)
      .optional(),
    street: yup.string().optional(),
    address: yup.string().optional(),
    residencial_number: yup.string().optional(),
    complement: yup.string().optional(),
    district: yup.string().optional(),
    city: yup.string().optional(),
    state: yup.string().optional(),
  });
}
