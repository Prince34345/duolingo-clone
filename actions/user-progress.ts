"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challengeProgress, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress  = async (courseID: number) => {
    const {userId} = await auth()
    const user = await currentUser();

    if (!user || !userId) {
         throw new Error("Unauthorized User");       
    }

    const course  = await getCourseById(courseID);

    if (!course) {
        throw new Error("Course Not Found");
    }


    // if (!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course is empty.")
    // }

    const existingUserProgress = await getUserProgress();

    if(existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseID,
            username: user.firstName || "User",
            userImageSrc: user.imageUrl || "/asset/mascot.svg",

        })
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId, 
        activeCourseId: courseID,
        username: user.firstName || "User",
        userImageSrc: user.imageUrl || "/asset/mascot.svg"
    })

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");

}


export const reduceHearts = async (challengeID: number) => {
      const {userId} = await auth()

      if (!userId) {
          throw new Error("Unauthorized.");
      }

      const currentUserProgress  = await getUserProgress();
     
      const existingChallengeProgess = await db.query.challengeProgress.findFirst({
         where: and(eq(challengeProgress.userID, userId), eq(challengeProgress.challengeID, challengeID))
      })

      const isPractice =  !!existingChallengeProgess;

      if (isPractice) {
          return {error: "practice."}
      }
      if (!currentUserProgress) {
          throw new Error("User Progress not found")   
      }
}