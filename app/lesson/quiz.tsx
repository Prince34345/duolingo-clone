'use client';

import { challenges, challengeOptions } from "@/db/schema";
import { useState } from "react";
import Header from "./header";
import { QuestionBubble } from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";

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

    const [selectedOption, setSelectedOption] =useState<number>()
    const [status, setStatus] = useState<"correct" | "none" | "wrong">("none")
    const challenge = challenges[activeIndex]
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };
    const onSelect = (id: number) => {
        if (status !== "none") {
            return
        }
        setSelectedOption(id)
    };
    const onContinue = () => {
      if (!selectedOption) {
          return       
      }
      if (status === "wrong") {
          setStatus("none");
          setSelectedOption(undefined);
          return;
      }
      if (status === "correct") {
        onNext()
        setStatus("none");
        setSelectedOption(undefined);
        return;
    }
  const correctOption = options.find((option) => option.correct)
 if(!correctOption){
    return
 }
  if (correctOption && correctOption.id === selectedOption){
      console.log("Correct Options.")   
  }else { 
      console.error("Incorrect option.")
  }
}

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
                         onSelect={onSelect}
                         status={status}
                         selectedOption={selectedOption}
                         disabled={false}
                         type={challenge.type}
                    />
                 </div>
            </div>
        </div>
    </div>
    <Footer
        disabled={!selectedOption}
        status={status}
        onCheck={onContinue}
    />
    </>

  )
}

export default Quiz