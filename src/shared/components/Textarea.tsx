import * as React from "react"
import { cn } from "../lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-component border border-dark-border bg-dark-surface px-3 py-2.5 text-sm transition-colors duration-150 placeholder:text-dark-text-tertiary hover:border-dark-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-40 resize-none dark:border-dark-border dark:bg-dark-surface dark:placeholder:text-dark-text-tertiary dark:hover:border-dark-border-strong",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
