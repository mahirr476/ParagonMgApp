// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BoardProvider } from '@/contexts/BoardContext'
import MainLayout from '@/components/layout/MainLayout'
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Monday Clone',
  description: 'A clone of monday.com built with Next.js and shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TooltipProvider delayDuration={300}>
          <BoardProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </BoardProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}