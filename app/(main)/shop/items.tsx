'use client';

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription:boolean;
}

const POINTS_TO_REFILL = 10

const Items = ({hasActiveSubscription, hearts, points}: Props) => {
    const [pending, startTranstion] = useTransition();
    
    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
            return   
        } 
        startTranstion(() => {
            refillHearts().catch(() => toast.error("Something Went Wrong."))
        })
    }

    const onUpgrade = () => {
        startTranstion(() => {
              createStripeUrl().then((res) => {
                   if (res.data) {
                     window.location.href = res.data                    
                   }
              }).catch(() => toast.error("Something went wrong"))
        })
    }

    return (
    <ul className="w-full">
        <div className="gap-x-4 border-t-2 flex items-center w-full p-4">
            <Image src={"asset/heart.svg"} alt="Heart" height={60} width={60}/>
             <div className="flex-1">
                 <p className="font-bold text-neutral-700 text-base">
                    Refill Hearts
                 </p>
             </div>
             <Button onClick={onRefillHearts} disabled={hearts === 5 || points < POINTS_TO_REFILL}>
                {hearts === 5 ? 'full' :(<div className="flex items-center">
                  <Image src={"/asset/points.svg"} alt="Points" height={20} width={20}/>
                  <p>{POINTS_TO_REFILL}</p>
                </div>
                )}
             </Button>
        </div>
        <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
              <Image src={"/asset/unlimited.svg"} alt="Unlimited" height={60} width={60}/>
           <div className="flex-1">
               <p className="font-bold text-neutral-700 text-base">
                  Unlimited Hearts
               </p>
           </div>
           <Button disabled={pending || hasActiveSubscription}
             onClick={onUpgrade}
           >  
            {hasActiveSubscription ? "active": "upgrade"}
           </Button>
        </div>
     </ul>
  )
}

export default Items