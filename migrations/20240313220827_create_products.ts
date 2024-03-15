import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary().index();

    table.string("name", 155).notNullable();
    table.string("description").notNullable();

    table.decimal("price").notNullable();

    table.integer("categorie_id").unsigned();
    table
      .foreign("categorie_id")
      .references("categories.id")
      .deferrable("deferred");

    table.integer("image_id").unsigned();
    table.foreign("image_id").references("files.id").deferrable("deferred");

    table.timestamp("created_at").nullable();
    table.timestamp("update_at").nullable();
    table.timestamp("delete_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
