import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

// @ts-ignore
const db = drizzle(sql, {schema});

const main = async () => {
    try {
        console.log("Seeding Database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");   
    }
}

main();