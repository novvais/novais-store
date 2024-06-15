import { cpf } from "cpf-cnpj-validator"

export class ValidateCpf {
    static async validCpf(numCpf: string) {
        return cpf.isValid(numCpf)
    }

    static async formatCpf(numCpf: string) {
        return cpf.format(numCpf)
    }
}