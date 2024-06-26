"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    const {isOpen, close} = useHeartsModal();


    const onSubscript = () => {
        close();
        router.push("/store")
    }

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
           <DialogContent className="max-w-md">
              <DialogHeader>
              <div className="flex items-center w-full justify-center mb-5">
                  <Image src={"/asset/mascot_bad.svg"} height={80} width={80} alt="Mascot"/>                
               </div>
               <DialogTitle className="text-center font-bold text-2xl ">
                 You are ran out of hearts.
               </DialogTitle>
               <DialogDescription>
                 Get Pro for Unlimited hearts, or purchase them in the store
               </DialogDescription>
             </DialogHeader>
             <DialogFooter className="mb-4">
                  <div className="flex flex-col gap-y-4 w-full">
                    <Button className="w-full" size={"lg"} onClick={onSubscript} variant={"primary"}>
                        Get Pro +
                    </Button>
                    <Button className="w-full" size={"lg"} onClick={close} variant={"secondary"}>
                        No thanks!
                    </Button>
                  </div>
             </DialogFooter>
           </DialogContent>
        </Dialog>
    )

}