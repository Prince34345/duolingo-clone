import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "@/components/sidebar-item";
import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import { Loader } from "lucide-react";
type Props = {
  className?: string;
};
const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex  h-full lg:fixed left-0 top-0 px-4 border-r-2 flex-col lg:w-[256px]",
        className
      )}
    >
    <Link href={"/learn"}>
      <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
        <Image src={"/asset/mascot.svg"} height={40} width={40} alt="mascot" />
        <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
          Lingo
        </h1>
      </div>
    </Link>
    <div className="flex flex-col gap-y-2 flex-1">
          <SidebarItem iconSrc="/asset/learn.svg" href="/learn" label={"Learn"}/>
          <SidebarItem iconSrc="/asset/leaderboard.svg" href="/leaderboard" label={"Leaderboard"}/>
          <SidebarItem iconSrc="/asset/quests.svg" href="/quest" label={"Quests"}/>
          <SidebarItem iconSrc="/asset/shop.svg" href="/shop" label={"Shop"}/>
    </div>
    <div className="p-4">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
    </div>
    </div>
  );
};

export default Sidebar;
