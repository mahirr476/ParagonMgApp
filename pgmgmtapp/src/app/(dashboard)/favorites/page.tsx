// src/app/(dashboard)/favorites/page.tsx
"use client"

import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

export default function FavoritesPage() {
  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Star className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
        <h1 className="text-xl font-medium mb-2">You have no favorites yet!</h1>
        <p className="text-muted-foreground">
          Add boards, docs, or dashboards to your favorites tab for quick and easy access.
        </p>
      </Card>
    </div>
  )
}