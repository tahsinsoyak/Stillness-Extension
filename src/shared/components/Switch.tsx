import * as React from "react"
import { cn } from "../lib/utils"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={cn(
          "relative inline-flex h-[22px] w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-dark-base disabled:cursor-not-allowed disabled:opacity-40",
          checked ? "bg-accent" : "bg-dark-subtle dark:bg-dark-subtle",
          className
        )}
        onClick={() => onCheckedChange?.(!checked)}
        ref={ref as any}
        {...(props as any)}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
            checked ? "translate-x-[18px]" : "translate-x-0"
          )}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
