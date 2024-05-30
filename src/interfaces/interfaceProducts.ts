export interface IRegisterProduct {
  name: string;
  description: string;
  stock_quantity?: number;
  price: number;
  categorie_id: number;
  product_image: string;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  stock_quantity?: number;
  price?: number;
  categorie_id?: number;
  product_image?: string;
}
