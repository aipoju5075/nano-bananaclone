import { cn } from "@/lib/utils"

interface BananaIconProps {
  className?: string
}

export function BananaIcon({ className }: BananaIconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={cn("h-6 w-6", className)}>
      <path d="M52.5 8.5c-2.5-2-6-2.5-9-1.5-4 1.5-7 4.5-9 8-3 5-5 11-6 17-1.5 8-2 16 0 24 1 4 3 7.5 6.5 9.5 2.5 1.5 5.5 1.5 8 0 3-2 5-5.5 6-9 2-6 3-12.5 3-19 0-5-.5-10-1.5-15 .5-2 1-4 1-6 .5-3 .5-6 1-8z" />
      <path
        d="M48 12c-3 1-5.5 3.5-7 6.5-2.5 4.5-4 9.5-5 14.5-1.5 7-2 14.5-.5 21.5.5 2.5 1.5 5 3.5 6.5 1.5 1 3.5 1 5-.5 2-1.5 3.5-4 4.5-6.5 1.5-5 2.5-10.5 2.5-16 0-4.5-.5-9-1-13.5-.5-4-1-8-2-12z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  )
}
