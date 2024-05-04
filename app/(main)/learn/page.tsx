import Feedwrapper from "@/components/feedwrapper"
import Stickywrapper from "@/components/stickywrapper"
import Header from "./header"
import UserProgress from "@/components/userprogress"
import { getUnits, getUserProgress, getCourseProgress, getLessonPercentage } from "@/db/queries"
import { redirect } from "next/navigation"
import Unit from "./unit"
import { lessons, units as unitsSchema } from '@/db/schema';

const LearnPage  = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits()
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  
  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData])
  
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
                    <Unit id={unit.id} order={unit.order} description={unit.description}  title={unit.title} lessons={unit.lessons} activeLesson={courseProgress?.activeLesson as typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect
                    } | undefined } activeLessonPercentage={lessonPercentage}/>
                </div>
              })
             }
          </Feedwrapper>
        </div>
    )
}

export default LearnPage