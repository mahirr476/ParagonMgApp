// src/app/page.tsx
"use client"

import { useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import BoardComponent from '@/components/board/BoardComponent'
import { boards as initialBoards } from '@/data/board-data'
import { useBoard } from '@/contexts/BoardContext'

export default function Home() {
  const { currentBoard, updateBoard, setBoards, setCurrentBoard } = useBoard()

  useEffect(() => {
    // Initialize boards if none exist
    if (!currentBoard) {
      setBoards(initialBoards)
      setCurrentBoard(initialBoards[0])
    }
  }, [setBoards, setCurrentBoard, currentBoard])

  if (!currentBoard) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <BoardComponent 
        board={currentBoard}
        onBoardUpdate={updateBoard}
      />
    </MainLayout>
  )
}