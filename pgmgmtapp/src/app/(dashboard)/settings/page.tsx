// src/app/(dashboard)/settings/page.tsx
"use client"

import { Card } from '@/components/ui/card'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-medium mb-6">Settings</h1>
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Settings className="h-6 w-6" />
          <h2 className="text-lg font-medium">General Settings</h2>
        </div>
        <p className="text-muted-foreground">
          Configure your workspace settings and preferences.
        </p>
      </Card>
    </div>
  )
}