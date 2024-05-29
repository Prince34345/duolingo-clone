import Feedwrapper from "@/components/feedwrapper";
import Stickywrapper from "@/components/stickywrapper"
import UserProgress from "@/components/userprogress"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "./items";

const ShopPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const [userProgress,userSubscription] = await Promise.all([userProgressData, userSubscriptionData])
    
    if (!userProgress || !userProgress.activeCourse) {
       redirect("/courses")      
    }

    const isPro = !!userSubscription?.isActive

    return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <Stickywrapper>
            <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={isPro}/>
            
        </Stickywrapper>
        <Feedwrapper>
            <div className="w-full flex flex-col items-center ">
                <Image src={"/asset/shop.svg"} height={90} width={90} alt="shop"/>
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">Shop</h1>
                <p className="text-muted-foreground text-center text-lg">Spend Your points on Cool stuff.</p>
                <Items hasActiveSubscription={isPro} points={userProgress.points} hearts={userProgress.hearts} />
            </div>
        </Feedwrapper>
    </div>
  )
}

export default ShopPage