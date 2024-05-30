export interface IRegisterAdress {
    user_id: number
    cep: string
    street: string
    adress: string
    residencial_number: number
    complement?: string
    district: string
    city: string
    state: string
}

export interface IUpdateAdress {
    user_id?: number
    cep?: string
    street?: string
    adress?: string
    residencial_number?: number
    complement?: string
    district?: string
    city?: string
    state?: string
}