import Feedwrapper from "@/components/feedwrapper"
import Stickywrapper from "@/components/stickywrapper"
import Header from "./header"
import UserProgress from "@/components/userprogress"
import { getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"

const LearnPage  = async () => {
  const userProgressData = getUserProgress();
  const [userProgress] = await Promise.all([userProgressData])
  
  if(!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }
  
  return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
          <Stickywrapper>
             <UserProgress  activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false}/>
          </Stickywrapper> 
          <Feedwrapper>
             <Header title={userProgress.activeCourse.title}/>
             
          </Feedwrapper>
        </div>
    )
}

export default LearnPage