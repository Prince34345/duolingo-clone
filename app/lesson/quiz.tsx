'use client';

import { challenges, challengeOptions } from "@/db/schema";
import { useState } from "react";
import Header from "./header";
import { QuestionBubble } from "./question-bubble";
import Challenge from "./challenge";

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
    const [challenges] = useState(intialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() =>  {
           const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed )
           return uncompletedIndex === -1 ? 0 : uncompletedIndex
    })

    const challenge = challenges[activeIndex]
    const options = challenge?.challengeOptions ?? [];

    const title = challenge.type === "ASSITS" ? "Select the correct meaning" : challenge.question
    return (
    <>
    <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
    />
    <div className="flex-1">
        <div className="h-full flex items-center justify-center">
            <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                 <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                    {title}
                 </h1>
                 <div>
                    {/* {Todo challenge compoent} */}
                    {challenge.type === "ASSITS" && (
                        <QuestionBubble question={challenge.question}/>
                    )}
                    <Challenge
                         options={options}
                         onSelect={() => {}}
                         status="none"
                         selectedOption={undefined}
                         disabled={false}
                         type={challenge.type}
                    />
                 </div>
            </div>
        </div>
    </div>
    </>

  )
}

export default Quiz