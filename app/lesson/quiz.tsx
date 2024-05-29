'use client';

import { challenges, challengeOptions, lessons } from "@/db/schema";
import { useState, useTransition } from "react";
import Header from "./header";
import ResultCard from "./result-card";
import { QuestionBubble } from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti"
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-pratice-modal";
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
    const {open: openHeartsModal} = useHeartsModal();
    const {open: openPracticeModal} = usePracticeModal();
    
    useMount(() => {
        if (intialPercentage === 100) {
            openPracticeModal()        
        }
    })


    const {width, height} = useWindowSize()
    const router = useRouter()
    
    const [finishAudio] = useAudio({src: "/music/finish.mp3", autoPlay: true})


    const [ correctAudio,_c,correctControl] = useAudio({src:"/music/correct.wav"})
    const [ inCorrectAudio,_ic,inCorrectControl] = useAudio({src:"/music/incorrect.wav"})
    
    
    const [isPending, startTranstion] =  useTransition();
    const [lessonId] = useState(intialLessonId)
    const [hearts, setHearts] =  useState(intialHearts)
    const [percentage, setPercentage] = useState(() => {
        return intialPercentage === 100 ? 0 : intialPercentage
    }) 
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
  if (correctOption.id === selectedOption){
    startTranstion(() => {
        upsertChallengeProgress(challenge.id).then((response) => {
              if (response?.error === "hearts") {
                 openHeartsModal(); 
                 return            
              }
              correctControl.play()
              setStatus("correct");
              setPercentage((Perc) => (Perc + 100 / challenges.length))
             if (intialPercentage === 100) {
                setHearts((prev) => Math.min(prev + 1, 5));  
             }
            }).catch(() => toast.error("something went wrong. Please try again."))
    })
  }else { 
      startTranstion(() => reduceHearts(challenge.id).then((response) => {
        if (response?.error === "hearts") {
           openHeartsModal();
           return;         
        }
        inCorrectControl.play()
        setStatus("wrong")
        if (!response?.error) {
             setHearts((prev) => Math.max(prev - 1, 0))
        }
      }).catch(() => {toast.error("Something went wrong. please try again")}))
  }
}
    if (!challenge) {
        return (
            <>
            {finishAudio}
            <Confetti
                recycle={false}
                numberOfPieces={500}
                tweenDuration={10000}
                width={width}
                height={height}
            />

            <div className="max-w-lg mx-auto text-center overflow-hidden  items-center justify-center h-full flex flex-col gap-y-4 lg:gap-y-8">
                 <Image alt={"Finish"} src={"/asset/finish.svg"} className="hidden lg:block" height={100} width={100}/>
                 <Image alt={"Finish"} src={"/asset/finish.svg"} className="block lg:hidden" height={50} width={50}/>
            <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                Great Job <br /> You &apos;ve completed the lesson
            </h1>
            <div className="flex items-center gap-x-4 w-full">
                  <ResultCard variant="points" value={challenges.length * 10} />
                  <ResultCard variant="hearts" value={hearts} />
            </div>
            </div>
            <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")}/>

            </>
        )        
    }
    const title = challenge.type === "ASSITS" ? "Select the correct meaning" : challenge.question
    return (
    <>
    {inCorrectAudio}
    {correctAudio}
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
                         disabled={isPending}
                         type={challenge.type}
                    />
                 </div>
            </div>
        </div>
    </div>
    <Footer
        disabled={isPending || !selectedOption}
        status={status}
        onCheck={onContinue}
    />
    </>

  )
}

export default Quiz