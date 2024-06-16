import { finished } from "stream";
import * as yup from "yup";

export class ValidatorOrder {
  static registerOrderValidator = yup.object({
    cart_id: yup.number().required(),
    card: yup.object({
      number: yup.string().min(15).max(19).required(),
      exp_month: yup.number().required(),
      exp_year: yup.number().required(),
      cvc: yup.number().required(),
    }),
    transaction_id: yup.string().optional(),
  });

  static refundOrderValidator = yup.object({
    transaction_id: yup.string().required(),
  });
}
