import Feedwrapper from "@/components/feedwrapper"
import Stickywrapper from "@/components/stickywrapper"
import Header from "./header"
import UserProgress from "@/components/userprogress"

const LearnPage  = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
          <Stickywrapper>
             <UserProgress  activeCourse={{title: "Spanish", imageSrc: "/asset/es.svg"}} hearts={5} points={100} hasActiveSubscription={false}/>
          </Stickywrapper> 
          <Feedwrapper>
             <Header title="Spanish"/>
             
          </Feedwrapper>
        </div>
    )
}

export default LearnPage