import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable , serial, text, boolean} from "drizzle-orm/pg-core";
export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_Src").notNull(),
})


export const coursesRelations = relations(courses, ({many}) => ({
    userProgress: many(userProgress),
    units: many(units)
}))



export const units = pgTable('units', {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, {onDelete: 'cascade'}).notNull(),
    order:integer("order").notNull()
})

export const lessons = pgTable("lessons", {
    id: serial("id").notNull(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull()
})

export const lessonsRelations = relations(lessons, ({one, many}) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges)
}))

export const unitRelations = relations(units, ({many, one}) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id]
    }),
    lesson :many(lessons)
}))

export const challengesEnum = pgEnum("type", ["SELECT", "ASSITS"])

export const challenges = pgTable("challenges", {
    id: serial("id").notNull(),
    lessonID: integer("lessons_id").references(() => lessons.id, {onDelete: 'cascade'}).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull()
})


export const challengesRelations = relations(challenges, ({one, many}) => ({
    lessons: one(lessons, {
        fields: [challenges.lessonID],
        references: [lessons.id]
    })
}))

export const challengeOption = pgTable("challengeOption", {
    id: serial("id").notNull(),
    challengeID: integer("challenge_id").references(() => challenges.id, {onDelete: 'cascade'}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_Src"),
    audioSrc: text("audio_Src")
})

export const challengeOptionRelations = relations(challengeOption, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeOption.challengeID],
        references: [challenges.id]
    })
}))


export const userProgress = pgTable('user_progress', {
    userId: text("user_id").primaryKey(),
    username: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/asset/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, {onDelete:'cascade'}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0)

})

export const userProgressRelations = relations(userProgress, ({one}) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}))