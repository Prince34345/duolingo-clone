import Feedwrapper from "@/components/feedwrapper"
import Stickywrapper from "@/components/stickywrapper"
import Header from "./header"
import UserProgress from "@/components/userprogress"
import { getUnits, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"
import { lessons } from '../../../db/schema';
import Unit from "./unit"

const LearnPage  = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits()

  const [userProgress, units] = await Promise.all([userProgressData, unitsData])
  
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
             {
              units.map((unit) => {
                return <div className="mb-10" key={unit.id}>
                    <Unit id={unit.id} order={unit.order} description={unit.description}  title={unit.title} lessons={unit.lessons} activeLesson={undefined} activeLessonPercentage={0}/>
                </div>
              })
             }
          </Feedwrapper>
        </div>
    )
}

export default LearnPage