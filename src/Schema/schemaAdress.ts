import * as yup from "yup";

export class ValidatorAdress {
  static registerAdressValidator = yup.object({
    user_id: yup.number().required(),
    cep: yup
      .string()
      .matches(/^\d{8}$/)
      .required(),
    adress: yup.string().required(),
    residencial_number: yup.number().required(),
    complement: yup.string().optional(),
    district: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
  });

  static updateAdressValidator = yup.object({
    user_id: yup.number().optional(),
    cep: yup
      .string()
      .matches(/^\d{8}$/)
      .optional(),
    adress: yup.string().optional(),
    residencial_number: yup.number().optional(),
    complement: yup.string().optional(),
    district: yup.string().optional(),
    city: yup.string().optional(),
    state: yup.string().optional(),
  });
}
