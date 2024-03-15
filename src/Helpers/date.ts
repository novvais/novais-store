import { knex } from "../Connection/knex"

export class At {
    static async createdAt (tableName: string, id: number) {
        await knex(tableName).where({ id }).update({ created_at: new Date() })
    }

    static async updateAt (tableName: string, id: number) {
        await knex(tableName).where({ id }).update({ update_at: new Date() })
    }

    static async deleteAt (tableName: string, id: number) {
        await knex(tableName).where({ id }).update({ deleted_at: new Date() })
    }
}

