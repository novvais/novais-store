import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("carts", (table) => {
    table.increments("id").primary().index();

    table.integer("client_id").unsigned();
    table.foreign("client_id").references("clients.id").deferrable("deferred");

    table.integer("product_id").unsigned();
    table
      .foreign("product_id")
      .references("products.id")
      .deferrable("deferred");

    table.timestamp("created_at").nullable();
    table.timestamp("update_at").nullable();
    table.timestamp("delete_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("carts");
}
