import * as React from "react"
import { cn } from "../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 ease-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:offset-dark-base disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] rounded-component",
          {
            "bg-accent text-white hover:bg-accent-hover": variant === "primary",
            "bg-dark-subtle text-dark-text hover:bg-dark-elevated dark:bg-dark-subtle dark:text-dark-text dark:hover:bg-dark-elevated": variant === "secondary",
            "bg-transparent text-dark-text-secondary hover:bg-dark-subtle dark:text-dark-text-secondary dark:hover:bg-dark-subtle": variant === "ghost",
            "border border-dark-border bg-transparent text-dark-text hover:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-surface": variant === "outline",
            "bg-danger-muted text-danger hover:bg-danger/20": variant === "danger",
          },
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-9 px-4 text-sm": size === "md",
            "h-11 px-6 text-sm font-semibold": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
