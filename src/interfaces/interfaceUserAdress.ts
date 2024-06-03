export interface IRegisterAdress {
    user_id: number
    cep: string
    logadouro: string
    complemento?: string
    bairro: string
    localidade: string
    uf: string
}

export interface IUpdateAdress {
    user_id?: number
    cep?: string
    logadouro?: string
    complemento?: string
    bairro?: string
    localidade?: string
    uf?: string
}