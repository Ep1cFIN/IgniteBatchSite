import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
    DashboardIcon,
    AvatarIcon,
    GearIcon,
    RocketIcon,
    HeartIcon,
    PersonIcon,
} from "@radix-ui/react-icons";

const DashboardNav = () => {
    return (
        <section className="p-8 h-full flex flex-col">
            <div className="pb-12 flex flex-row items-center">
                <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">Roope Ripatti</h2>
                    <p className="text-sm"> Ignite coach </p>
                </div>
                
            </div>
            <nav className="flex justify-between flex-col h-full">
                <ul>
                    <li className="p-2">MENU</li>
                    <li className="p-1">
                        <Link className={buttonVariants({variant: "link"})} href="/r">
                            <DashboardIcon className="mr-3 h-5 w-5"/>Dashboard
                        </Link>
                    </li>
                    <li className="p-1">
                        <Link className={buttonVariants({variant: "link"})} href="/r/coaches">
                            <PersonIcon className="mr-3 h-5 w-5"/>Coaches
                        </Link>
                    </li>
                    <li className="p-1">
                        <Link className={buttonVariants({variant: "link"})} href="/r/deals">
                            <HeartIcon className="mr-3 h-5 w-5"/>Deals
                        </Link>
                    </li>
                    <li className="p-1">
                        <Link className={buttonVariants({variant: "link"})} href="/r/teams">
                            <RocketIcon className="mr-3 h-5 w-5"/>Teams
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className="p-2 pt-6">SETTINGS</li>
                    <li className="p-1">
                        <Link className={buttonVariants({variant: "link"})} href="/r/profile">
                            <AvatarIcon className="mr-3 h-5 w-5"/>Profile
                        </Link>
                    </li>
                    <li className="p-1">
                        <Link className={buttonVariants({variant: "link"})} href="/r/settings">
                            <GearIcon className="mr-3 h-5 w-5"/>Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
};

export default DashboardNav;