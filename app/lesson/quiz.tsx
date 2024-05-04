'use client';

import { challenges, challengeOptions } from "@/db/schema";
import { useState } from "react";
import Header from "./header";

type Props = {
   intialPercentage: number;
   intialHearts: number;
   intialLessonId: number;
   intialLessonChallenges: (typeof challenges.$inferSelect & {
       completed: boolean;
       challengeOptions: typeof challengeOptions.$inferSelect[]
   })[];
   userSubscription: any;
}


const Quiz = ({intialHearts, intialLessonChallenges, intialLessonId, intialPercentage , userSubscription}: Props) => {
    const [hearts, setHearts] =  useState(intialHearts)
    const [percentage, setPercentage] = useState(intialPercentage)
    return (
    <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
    />
  )
}

export default Quiz