// src/components/board/components/OwnerAvatar.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface OwnerAvatarProps {
  name: string
  className?: string
}

export function OwnerAvatar({ name, className }: OwnerAvatarProps) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className={cn("h-6 w-6", className)}>
          <AvatarFallback className="bg-[#579bfc] text-white text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}