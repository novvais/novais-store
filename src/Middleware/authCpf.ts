import { cpf } from "cpf-cnpj-validator"
import { InternalServerError } from "../Helpers/api-erros";

export async function AuthCpf(cpfClient: string) {
    try {
        await cpf.isValid(cpfClient)
    } catch (error) {
        throw new InternalServerError(error.message);
    }
}
