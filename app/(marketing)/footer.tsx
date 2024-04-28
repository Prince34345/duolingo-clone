import { Button } from "@/components/ui/button"
import Image from "next/image"

const Footer = () => {
  return (
     <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2 ">
       <div className="lg:max-w-screen-lg mx-auto flex items-center justify-evenly ">
           <Button size={"lg"} variant={"ghost"} className="-w-full">
             <Image src="/asset/hr.svg" alt="croation" height={32} width={40} className="mr-4 rounded-md"/>
             Crotian
           </Button>
           <Button size={"lg"} variant={"ghost"} className="-w-full">
             <Image src="/asset/es.svg" alt="croation" height={32} width={40} className="mr-4 rounded-md"/>
             Spanish
           </Button>
           <Button size={"lg"} variant={"ghost"} className="-w-full">
             <Image src="/asset/fr.svg" alt="croation" height={32} width={40} className="mr-4 rounded-md"/>
             French
           </Button>
           <Button size={"lg"} variant={"ghost"} className="-w-full">
             <Image src="/asset/it.svg" alt="croation" height={32} width={40} className="mr-4 rounded-md"/>
             Italian
           </Button>
           <Button size={"lg"} variant={"ghost"} className="-w-full">
             <Image src="/asset/jp.svg" alt="croation" height={32} width={40} className="mr-4 rounded-md"/>
             Japanese
           </Button>
       </div>
     </footer>
  )
}

export default Footer