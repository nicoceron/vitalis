"use client"

import * as React from "react"
import { TabsList } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const SafeTabsList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, ...props }, ref) => {
  return (
    <TabsList
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
})
SafeTabsList.displayName = "SafeTabsList"

export { SafeTabsList }
