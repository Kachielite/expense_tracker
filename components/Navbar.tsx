"use client";
import Logo from "@/app/components/Logo";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

export default function Navbar(){
    return (
        <>
            <DesktopNavbar />
        </>
    );
};

const items = [
    {
        label: "Dashboard",
        link: "/"
    },
    {
        label: "Transactions",
        link: "/transactions"
    },
    {
        label: "Manage",
        link: "/manage"
    }
]



function DesktopNavbar(){
    return(
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between px-8">
                <div className="h-[80px] min-h-[60px] flex items-center gap-x-4">
                    <Logo/>
                    <div className="flex h-full">
                        {items.map((item) =>
                            <NavbarItem
                                key={item.label}
                                label={item.label}
                                link={item.link}
                            />
                        )}
                    </div>
                </div>

            </nav>
        </div>
    )
}

function NavbarItem({label, link}: { label: string, link: string }) {
    const pathname = usePathname();
    const isActive = pathname === link;
    return (
        <div className="relative flex items-center">
            <Link
                href={link}
                className={cn(
                    buttonVariants({variant: "ghost"}),
                    "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
                    isActive && "text-foreground"
                )}
            >
                {label}
            </Link>
            {isActive && (
                <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl md:block bg-gradient-to-r from-amber-400 to-orange-500"/>
            )}
        </div>
    );
}