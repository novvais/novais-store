export interface IRegisterAddress {
  client_id: number;
  cep: string;
  street: string;
  address: string;
  residencial_number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
}

export interface IUpdateAddress {
  client_id?: number;
  cep?: string;
  street?: string;
  address?: string;
  residencial_number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
}
