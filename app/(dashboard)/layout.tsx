import {ReactNode} from "react";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex h-screen w-full flex-col"
    >
        <div className="w-full">
            <Navbar/>
          {children}
        </div>
    </div>
  );
}