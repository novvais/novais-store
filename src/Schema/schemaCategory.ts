import * as yup from "yup"

export class ValidatorCategory {
    static createCategoryValidator = yup.object({
        name: yup.string().required()
    })

    static updateCategoryValidator = yup.object({
        name: yup.string().optional()
    })
}
