// src/components/board/BoardDialogs.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  
  interface BoardDialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
  }
  
  export function BoardDialog({ isOpen, onClose, title }: BoardDialogProps) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {/* Placeholder content */}
            <p className="text-gray-500">This feature is coming soon...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }