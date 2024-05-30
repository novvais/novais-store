export interface IRegisterCart {
  client_id: number;
  product_id: number;
  product_quantity: number;
}

export interface IUpdateCart {
  client_id?: number;
  product_id?: number;
  product_quantity?: number;
}
