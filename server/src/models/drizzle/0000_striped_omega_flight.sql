DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Working', 'Working Remotely', 'On Vacation', 'Business Trip');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"status" "status" DEFAULT 'Working' NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
