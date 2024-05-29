"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-pratice-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false);

    const {isOpen, close} = usePracticeModal();


  

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
           <DialogContent className="max-w-md">
              <DialogHeader>
              <div className="flex items-center w-full justify-center mb-5">
                  <Image src={"/asset/heart.svg"} height={80} width={80} alt="Practice"/>                
               </div>
               <DialogTitle className="text-center font-bold text-2xl ">
                 Practice Lesson
               </DialogTitle>
               <DialogDescription>
                 Use Practice Lesson Again to regain hearts and points. You can't loose hearts and points in Practice Lessons
               </DialogDescription>
             </DialogHeader>
             <DialogFooter className="mb-4">
                  <div className="flex flex-col gap-y-4 w-full">
                    <Button className="w-full" size={"lg"} onClick={close} variant={"primaryOutline"}>
                        I understand It!
                    </Button>
                  </div>
             </DialogFooter>
           </DialogContent>
        </Dialog>
    )
}