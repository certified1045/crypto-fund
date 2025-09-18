CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);

ALTER TABLE "payment" RENAME TO "payments";
ALTER TABLE "user" RENAME TO "users";
ALTER TABLE "users" DROP CONSTRAINT "user_username_unique";
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";
ALTER TABLE "payments" DROP CONSTRAINT "payment_user_id_user_id_fk";

ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");