import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}
const UserProgress = ({activeCourse, hearts, points, hasActiveSubscription}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
        <Link href="/courses">
             <Button variant={"ghost"}>
                 <Image width={32} height={32} className="rounded-md border" src={activeCourse.imageSrc} alt={activeCourse.title}/>
             </Button>
        </Link>
        <Link href="/shop">
             <Button variant={"ghost"} className="text-orange-500">
                 <Image width={28} height={28} className="mr-2" src={"/asset/points.svg"} alt="Points"/>
                 {points}
             </Button>
        </Link>
        <Link href="/shop">
             <Button variant={"ghost"} className="text-rose-500">
                 <Image width={28} height={28} className="mr-2" src={"/asset/heart.svg"} alt="Hearts"/>
                 {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> :  hearts}
             </Button>
        </Link>
    </div>
  )
}

export default UserProgress