import React, { ReactNode } from "react";
import {Logo} from "@/app/components/Logo";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center">
        <Logo/>
      <div className="mt-12">
        {children}
      </div>
    </div>
  );
}
