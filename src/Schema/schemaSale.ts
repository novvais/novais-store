import * as yup from "yup";

export class ValidatorSale {
  static registerSaleCardValidator = yup.object({
    client_id: yup.number().required(),
    cart_id: yup.number().required(),
    total_price: yup.number().required(),
    card: yup.object({
      number: yup.string().min(15).max(19).required(),
      exp_month: yup.number().required(),
      exp_year: yup.number().required(),
      cvc: yup.number().required(),
    }),
  });

  static registerSaleBoletoValidator = yup.object({
    client_id: yup.number().required(),
    product_id: yup.number().required(),
    quantity: yup.number().required(),
    total_price: yup.number().required(),
  });

  static refundSaleValidator = yup.object({
    transaction_id: yup.string().required()
  });
}
