import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  pgEnum,
  json,
  text,
  serial,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role_type", ["admin", "user", "moderator"]);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).unique(),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  imgURL: text("img_url").notNull(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const userRelations = relations(users, ({ one }) => ({
  payments: one(payments, {
    fields: [users.id],
    references: [payments.userId],
  }),
}));

export const paymentRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
    relationName: "userPayment",
  }),
}));

export type Payment = InferSelectModel<typeof payments>;
export type User = InferSelectModel<typeof users> & {
  payment: Payment | null;
};
