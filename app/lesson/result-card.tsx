import Image from "next/image"
import { cn } from "@/lib/utils"
type Props  = {
    value: number;
    variant: "points" | "hearts"
}
export default function ResultCard({value, variant}: Props) {
    const imageSrc = variant === "hearts" ? "/asset/heart.svg" : "/asset/points.svg"
    return (
         <>
         <div className={cn("rounded-2xl border-2 w-full", variant === "points" && "bg-orange-400 border-orange-400", variant === "hearts" && "bg-rose-500 border-rose-500")}>
            <div className={cn("p-1.5 text-white rounded-t-xl font-bold uppercase text-xs text-center", variant === "hearts" && "bg-rose-500", variant === "points" && "bg-orange-400")}>
                {variant === "hearts" ? "Hearts Left" : "Total XP"}
            </div>
            <div className={cn(variant === "hearts" && "text-rose-500", variant === "points" && "text-orange-400","rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg")}>
               <Image alt="Icon" src={imageSrc} height={30} width={30} className="mr-1.5"/>
               {value}
            </div>
         </div>
         </>
    )
}