import {ReactNode} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

type SkeletonWrapperProps = {
    children: ReactNode;
    isLoading: boolean;
    fullWidth?: boolean;
}

export default function SkeletonWrapper({children, isLoading, fullWidth = true}: SkeletonWrapperProps) {
    if(!isLoading)  return children;
    return (
        <Skeleton
            className={cn(fullWidth && "w-full")}
        >
            <div className="opacity-0">
                {children}
            </div>
        </Skeleton>
    )
}