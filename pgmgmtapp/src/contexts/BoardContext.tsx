// src/contexts/BoardContext.tsx
"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { Board } from '@/types/board'
import { boards as initialBoards } from '@/data/board-data'

interface BoardContextType {
  boards: Board[]
  currentBoard: Board | null
  setBoards: (boards: Board[]) => void
  setCurrentBoard: (board: Board) => void
  updateBoard: (updatedBoard: Board) => void
}

const BoardContext = createContext<BoardContextType | undefined>(undefined)

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [currentBoard, setCurrentBoard] = useState<Board | null>(boards[0] || null)

  const updateBoard = (updatedBoard: Board) => {
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