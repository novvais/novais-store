import { knex } from "../Connection/knex";
import { At } from "../Helpers/date";

export class CategoriesService {
    static async listCategoriesService () { 
        const categories = await knex("categories");
    
        return categories
    }

    static async deleteCategoryService (id: number){
        await At.deleteAt("categories", id);
    }
}
