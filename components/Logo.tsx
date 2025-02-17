import {PiggyBank} from "lucide-react";
import Link from "next/link";

const Logo = () => {
    return (
        <Link
            href="/public"
            className="flex items-center gap-2"
        >
            <PiggyBank className="stroke h-11 w-11 stroke-amber-500 stroke-[1.5]"/>
            <p
                className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-bold text-3xl leading-tight -tracking-tighter"
            >
                ExpenseTracker
            </p>
        </Link>
    );
};


const LogoMobile = () => {
    return (
        <Link
            href="/public"
            className="flex items-center gap-2"
        >
            <p
                className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-bold text-xl leading-tight -tracking-tighter"
            >
                ExpenseTracker
            </p>
        </Link>
    );
};

export {Logo, LogoMobile};