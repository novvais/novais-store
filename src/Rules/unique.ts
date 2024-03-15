import vine from "@vinejs/vine";
import knex from "knex";

type Options = {
  table: string;
  column: string;
};

async function unique(value: unknown, options: Options, field: any) {
  if (typeof value !== "string") {
    return;
  }

  const row = await knex(options.table)
    .where(options.column, value)
    .first();

  if (row) {
    field.report("The {{ field }} field is not unique", "unique", field);
  }
}

export const uniqueRule = vine.createRule(unique)
