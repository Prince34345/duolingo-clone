import { Button } from "@/components/ui/button"

const ButtonPage = () => {
    return (
        <div className="space-y-4 p-4 flex flex-col max-w-[200px]">
            <Button>Default</Button>
            <Button variant={"primary"}>Primary</Button>
            <Button variant={"primaryOutline"}>Primary Outline</Button>
            <Button variant={"secondary"}>Secondary</Button>
            <Button variant={"secondaryOutline"}>Secondary Outline</Button>
            <Button variant={"danger"}>Danger</Button>
            <Button variant={"dangerOutline"}>Danger Outline</Button>
            <Button variant={"super"}>Super</Button>
            <Button variant={"superOutline"}>Super Outline</Button>
            <Button variant={"ghost"}>ghost</Button>
            <Button variant={"sidebar"}>Sidebar</Button>
            <Button variant={"sidebarOutline"}>Sidebar Outline</Button>
            
        
        </div>
    )
}


export default ButtonPage