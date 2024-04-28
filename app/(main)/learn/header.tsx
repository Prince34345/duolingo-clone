import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
}
const Header = ({title}: Props) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:mt-[-28px] lg:pt-[28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400  lg:z-50">
        <Link href={"/courses"}>
           <Button variant={"ghost"}>
             <ArrowLeft/>
           </Button>
        </Link>
        <h1 className="font-bold text-lg">
          {title}
        </h1>
        <div/>
    </div>
  )
}

export default Header