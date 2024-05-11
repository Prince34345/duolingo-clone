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
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.challengeOptions);



await db.insert(schema.courses).values([
    {id: 1, title: "Spanish", imageSrc: "/asset/es.svg"},
    {id: 2, title: "Italian", imageSrc: "/asset/it.svg"},
    {id: 3, title: "French", imageSrc: "/asset/fr.svg"},
    {id: 4, title: "Croatian", imageSrc: "/asset/hr.svg"}   
])


await db.insert(schema.units).values([
    {id: 1, courseID: 1, title: 'Unit 1', description: "Learn the basics of spanish", order: 1}
])

await db.insert(schema.lessons).values([
    {id: 1, unitId: 1, order: 1, title: "Nouns"},
    {id: 2, unitId: 1, order: 2, title: "Verbs"},
    {id: 3, unitId: 1, order: 3, title: "Verbs"},
    {id: 4, unitId: 1, order: 4, title: "Verbs"},
    {id: 5, unitId: 1, order: 5, title: "Verbs"}
])


await db.insert(schema.challenges).values([
    {id: 1, lessonID: 1, type: "SELECT", order: 1, question: 'Which one of these is the "the man"?'},
    {id: 2, lessonID: 2, type: "ASSITS", order: 2, question: 'the man'},
    {id: 3, lessonID: 3, type: "SELECT", order: 3, question: 'Which one of these is the "the robot"?'},
    
])

await db.insert(schema.challengeOptions).values([
    {challengeID: 1, imageSrc: "/asset/man.png", correct: true, text: "el hombre", audioSrc: "/music/es_man.mp3"},
    {challengeID: 1, imageSrc: "/asset/woman.webp", correct: false, text: "la mujer", audioSrc: "/music/es_woman.mp3"},
    {challengeID: 1, imageSrc: "/asset/robot.png", correct: false, text: "el robot", audioSrc: "/music/es_robot.mp3"}
])
await db.insert(schema.challengeOptions).values([
    {challengeID: 2, correct: true, text: "el hombre", audioSrc: "/music/es_man.mp3"},
    {challengeID: 2, correct: false, text: "la mujer", audioSrc: "/music/es_woman.mp3"},
    {challengeID: 2, correct: false, text: "el robot", audioSrc: "/music/es_robot.mp3"}
])

await db.insert(schema.challengeOptions).values([
    {challengeID: 3, imageSrc:"/asset/man.png",correct: false, text: "el hombre", audioSrc: "/music/es_man.mp3"},
    {challengeID: 3, imageSrc:"/asset/woman.webp",correct: false, text: "la mujer", audioSrc: "/music/es_woman.mp3"},
    {challengeID: 3, imageSrc:"/asset/robot.png",correct: true, text: "el robot", audioSrc: "/music/es_robot.mp3"}
])






        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");   
    }
}

main();