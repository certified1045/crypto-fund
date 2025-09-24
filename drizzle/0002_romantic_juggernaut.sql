ALTER TABLE "payments"
ALTER COLUMN "img_urls" TYPE text USING img_urls::text;
ALTER TABLE "payments"
    RENAME COLUMN "img_urls" TO "img_url";