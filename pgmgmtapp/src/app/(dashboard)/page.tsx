// src/app/(dashboard)/page.tsx (Home)
"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Plus, Settings2, MoreVertical, Rocket } from 'lucide-react'
import { useBoard } from '@/contexts/BoardContext'

export default function HomePage() {
  const { boards } = useBoard()

  const RecentBoard = ({ board }) => (
    <Card className="w-[280px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
      <img src="/api/placeholder/280/140" alt={board.name} className="w-full h-[140px] object-cover" />
      <div className="p-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">{board.name}</span>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 ml-auto h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          work management • Main workspace
        </div>
      </div>
    </Card>
  )

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl">Good afternoon, Mahir!</h1>
        <Button variant="outline">Quick Search</Button>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recently visited</h2>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add view
            </Button>
          </div>
          <div className="flex gap-4">
            {boards.slice(0, 3).map((board) => (
              <RecentBoard key={board.id} board={board} />
            ))}
          </div>
        </section>

        
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              Update feed (Inbox)
              <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
            </h2>
            <Button variant="ghost" size="sm">
              <Settings2 className="h-4 w-4 mr-1" />
              Customize
            </Button>
          </div>
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Roy Mann</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">23d</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">Hi @Mahir Rahman,</p>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-4">My workspaces</h2>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-purple-600 flex items-center justify-center text-white font-medium">
                M
              </div>
              <div>
                <h3 className="font-medium">Main workspace</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Rocket className="h-3 w-3" />
                  <span>work management</span>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}