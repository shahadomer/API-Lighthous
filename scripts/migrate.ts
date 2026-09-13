import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function runMigrate() {
  const connectionString =
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/api_lighthouse_dev";

  console.log(`[db:migrate] Connecting to database...`);
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  console.log(`[db:migrate] Running migrations from ./db/migrations...`);
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log(`[db:migrate] Migrations completed successfully!`);

  await sql.end();
}

runMigrate().catch((err) => {
  console.error(`[db:migrate] Migration failed:`, err);
  process.exit(1);
});
