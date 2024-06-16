export interface IRegisterOrder {
  cart_id: number;
  card: {
    number: string;
    exp_month: number;
    exp_year: number;
  };
  transaction_id?: string;
}

export interface IRefundOrder {
  transaction_id: string;
}
