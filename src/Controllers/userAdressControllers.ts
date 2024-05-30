import { InternalServerError } from "../Helpers/api-erros";
import { ValidatorAdress } from "../Schema/schemaAdress"
import { UserAdressService } from "../Services/userAdressServices";

export class UserAdressController {
    static async registerAdresscontroller(req: Request, res: Response) {
        try {
            const payload = await ValidatorAdress.registerAdressValidator.validate(req.body)

            await UserAdressService.registerAdressService(payload)

            
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }

    static async updateAdressController(req: Request, res: Response) {
        try {
            const payload = await ValidatorAdress.updateAdressValidator.validate(req.body)

            await UserAdressService.updateAdressService(payload)

        
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    }
}