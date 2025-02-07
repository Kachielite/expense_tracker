"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {UserButton} from "@clerk/nextjs";
import {ThemeSwitchButton} from "@/components/ThemeSwitcherButton";
import {useState} from "react";
import {Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {LogoMobile, Logo} from "@/app/components/Logo";

export default function Navbar(){
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
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

function MobileNavbar(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        className="w-[400px] sm:w-[540px]"
                        side="left"
                    >
                        <SheetHeader>
                            <SheetTitle/>
                            <SheetDescription/>
                        </SheetHeader>
                        <Logo/>
                        <div className="flex flex-col gap-1 pt-4">
                            {items.map((item) =>
                                <NavbarItem
                                    key={item.label}
                                    label={item.label}
                                    link={item.link}
                                    onClick={() => setIsOpen(prevState => !prevState)}
                                />
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <LogoMobile/>
                    <div className="flex items-center gap-2">
                        <ThemeSwitchButton/>
                        <UserButton afterSignOutUrl="/sign-in"/>
                    </div>
                </div>
            </nav>
        </div>
    );
}


function DesktopNavbar() {
    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="flex items-center justify-between px-8">
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
                <div className="flex items-center gap-2">
                    <ThemeSwitchButton/>
                    <UserButton afterSignOutUrl="/sign-in" />
                </div>
            </nav>
        </div>
    )
}

function NavbarItem({label, link, onClick}: { label: string, link: string, onClick?: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === link;
    return (
        <div className="relative flex items-center">
            <Link
                onClick={onClick}
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