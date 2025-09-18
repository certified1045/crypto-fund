import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema,
  casing: "snake_case",
});

export { db };
