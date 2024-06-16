export interface ICalculate {
  cart_id: number;
  zipCodeS: string;
  zipCodeD?: string;
}

export interface IRegisterShipping {
  cart_id: number
  shipping: string
  price: number
}

export interface IUpdateShipping {
  cart_id?: number
  shipping?: string
  price?: number
}

export interface IPropertiesLengths {
  id: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  quantity: number;
}
