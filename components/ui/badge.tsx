import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        working:
          "bg-[#E5FCDA] text-[#21D954] p-1.5 px-2.5 border-none rounded font-semibold",
        paused:
          "bg-[#FFD12E36] text-[#FFD12E] p-1.5 px-2.5 border-none rounded font-semibold",
        pending:
          "bg-[#FF90291F] text-[#FF9029] p-1.5 px-2.5 border-none rounded font-semibold",
        notStarted:
          "bg-[#1E78FF1F] text-[#1E78FF] p-1.5 px-2.5 border-none rounded font-semibold",
        completed:
          "bg-[#21D9541F] text-[#21D954] p-1.5 px-2.5 border-none rounded font-semibold",
        pausedState:
          "bg-[#FFD12E36] text-[#FFD12E] p-1.5 px-2.5 border border-black shadow-xl rounded font-semibold",
        workingState:
          "bg-[#E5FCDA] text-[#21D954] p-1.5 px-2.5 border border-black shadow-xl rounded font-semibold",
        high: "bg-[#FF383829] text-[#FF3838] p-1.5 px-2.5 border-none rounded font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
