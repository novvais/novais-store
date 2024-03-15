import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("clients", (table) => {
    table.increments("id").primary().index();

    table.string("name", 155).notNullable();
    table.string("email", 155).notNullable().index();
    table.string("password").notNullable();

    table.timestamp("created_at").nullable();
    table.timestamp("update_at").nullable();
    table.timestamp("delete_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("clients");
}
