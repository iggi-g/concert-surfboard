import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-elevated hover:shadow-glow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card",
        outline:
          "border border-ui-border bg-ui-surface text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 hover:shadow-glow backdrop-blur-sm shadow-card",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-card",
        ghost: "hover:bg-ui-surface/50 hover:text-text-primary hover:shadow-glow",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-button px-3.5 py-2.5",
        sm: "h-9 rounded-sm px-3",
        lg: "h-12 rounded-sm px-6",
        icon: "h-button w-button",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
