export interface ISaleCard {
  client_id: number;
  cart_id: number
  total_price: number;
  card: {
    number: string;
    exp_month: number;
    exp_year: number;
  };
}

export interface ISaleBoleto {}

export interface IRefund {
  transaction_id: string;
}
