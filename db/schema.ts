import { relations } from "drizzle-orm";
import { timestamp,integer, pgEnum, pgTable , serial, text, boolean} from "drizzle-orm/pg-core";
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
    courseID: integer("course_id").references(() => courses.id, {onDelete: 'cascade'}).notNull(),
    order:integer("order").notNull()
})

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
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
        fields: [units.courseID],
        references: [courses.id]
    }),
    lessons :many(lessons)
}))

export const challengesEnum = pgEnum("type", ["SELECT", "ASSITS"])

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonID: integer("lessons_id").references(() => lessons.id, {onDelete: 'cascade'}).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull()
})


export const challengesRelations = relations(challenges, ({one, many}) => ({
    lessons: one(lessons, {
        fields: [challenges.lessonID],
        references: [lessons.id]
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress)
}))

export const challengeOptions = pgTable("challenge_option", {
    id: serial("id").primaryKey(),
    challengeID: integer("challenge_id").references(() => challenges.id, {onDelete: 'cascade'}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_Src"),
    audioSrc: text("audio_Src")
})

export const challengeOptionRelations = relations(challengeOptions, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeID],
        references: [challenges.id]
    })
}))

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userID:text("user_id").notNull(), // TODO 
    challengeID: integer("challenge_id").references(() => challenges.id, {onDelete: 'cascade'}).notNull(),
    completed: boolean("completed").notNull().default(false)
})

export const challengeProgressRelations = relations(challengeProgress, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeID],
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


export const userSubscription = pgTable("user_subscription", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().unique(),
    stripeCustomerId: text("stripe_customer_id").notNull().unique(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
    stripePriceId: text("stripe_price_id").notNull(),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull()
})

