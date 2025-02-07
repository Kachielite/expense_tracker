import React, {ReactNode} from 'react';

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return (
        <div className="relative h-screen w-full flex flex-col justify-center items-center">
            {children}
        </div>
    );
}
