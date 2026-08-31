import React from "react";
import { cn } from "@/lib/utils";

export interface PopButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function PopButton({ className, children = "Learn More", ...props }: PopButtonProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#0e604b] bg-[#102d27] px-7 py-4 text-sm font-bold text-[#f5f2ea]",
        "transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0,0,0.58,1)]",
        "shadow-[0_10px_0_-2px_#95b9a5,0_10px_0_0_#0e604b,0_18px_0_0_#dfe7df]",
        "hover:translate-y-1 hover:bg-[#0e604b] hover:shadow-[0_7px_0_-2px_#95b9a5,0_7px_0_0_#0e604b,0_14px_0_0_#dfe7df]",
        "active:translate-y-[10px] active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e604b]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export default PopButton;
