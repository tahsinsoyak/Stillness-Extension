import * as React from "react"
import { cn } from "../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-component border border-dark-border bg-dark-surface px-3 py-2 text-sm transition-colors duration-150 placeholder:text-dark-text-tertiary hover:border-dark-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-border dark:bg-dark-surface dark:placeholder:text-dark-text-tertiary dark:hover:border-dark-border-strong",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
