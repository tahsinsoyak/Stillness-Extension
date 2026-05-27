import * as React from "react"
import { cn } from "../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide",
        {
          "bg-accent-muted text-accent": variant === "default",
          "bg-dark-subtle text-dark-text-secondary dark:bg-dark-subtle dark:text-dark-text-secondary": variant === "secondary",
          "bg-success-muted text-success": variant === "success",
          "bg-warning-muted text-warning": variant === "warning",
          "bg-danger-muted text-danger": variant === "danger",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
