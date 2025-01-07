// src/app/(dashboard)/board/[id]/page.tsx
"use client"

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useBoard } from '@/contexts/BoardContext'
import BoardComponent from '@/components/board/BoardComponent'

export default function BoardPage() {
  const params = useParams()
  const { boards, currentBoard, setCurrentBoard, updateBoard } = useBoard()

  useEffect(() => {
    const board = boards.find(b => b.id === params.id)
    if (board && (!currentBoard || currentBoard.id !== board.id)) {
      setCurrentBoard(board)
    }
  }, [params.id, boards, currentBoard, setCurrentBoard])

  if (!currentBoard) {
    return <div>Loading...</div>
  }

  return (
    <BoardComponent 
      board={currentBoard}
      onBoardUpdate={updateBoard}
    />
  )
}