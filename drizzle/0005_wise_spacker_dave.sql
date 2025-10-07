ALTER TABLE "users"
ADD COLUMN "deal_price" integer DEFAULT 3000 NOT NULL;
ALTER TABLE "users"
ADD COLUMN "security_deposit" integer DEFAULT 150 NOT NULL;