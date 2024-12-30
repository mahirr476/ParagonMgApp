// src/contexts/BoardContext.tsx
"use client"

import { createContext, useContext, useState } from 'react'
import { Board as BoardType } from '@/types/board'
import { boards as initialBoards } from '@/data/board-data'

interface BoardContextType {
  boards: BoardType[]
  currentBoard: BoardType | null
  setBoards: (boards: BoardType[]) => void
  setCurrentBoard: (board: BoardType) => void
  updateBoard: (updatedBoard: BoardType) => void
}

const BoardContext = createContext<BoardContextType | undefined>(undefined)

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<BoardType[]>(initialBoards)
  const [currentBoard, setCurrentBoard] = useState<BoardType | null>(boards[0] || null)

  const updateBoard = (updatedBoard: BoardType) => {
    setBoards(prev => 
      prev.map(board => 
        board.id === updatedBoard.id ? updatedBoard : board
      )
    )
    if (currentBoard?.id === updatedBoard.id) {
      setCurrentBoard(updatedBoard)
    }
  }

  return (
    <BoardContext.Provider 
      value={{ 
        boards, 
        currentBoard, 
        setBoards, 
        setCurrentBoard,
        updateBoard
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => {
  const context = useContext(BoardContext)
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider')
  }
  return context
}

export type { BoardType as Board }