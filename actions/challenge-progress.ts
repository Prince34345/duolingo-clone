"use server";

import { and, eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challenges, challengeProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const upsertChallengeProgress = async (challengeId: number) => {
    const {userId} = await auth();
    if (!userId) {
       throw new Error("Unauthorized");
    }  const currentUserProgress = await getUserProgress();
       
       if (!currentUserProgress) {
          throw new Error("User Progress not found")
       }
    
    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    }) 
   if (!challenge) {
       throw new Error("Challenge Not found!")   
   }
   const lesson = challenge.lessonID
   const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(eq(challengeProgress.userID, userId), eq(challengeProgress.challengeID, challengeId))
   });
   const isPractice = !!existingChallengeProgress;
   
   if (currentUserProgress.hearts === 0 && !isPractice)  {
        return {error: "hearts."}    
   }

}