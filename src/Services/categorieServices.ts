import { knex } from "../Connection/knex";

export class CategoriesService {
    static async listCategoriesService () { 
        const categories = await knex("categories");
    
        return categories
    }

    static async deleteCategoryService (id: number){
        await knex("categories").where({ id }).update({ deleted_at: new Date() })
    }
}
