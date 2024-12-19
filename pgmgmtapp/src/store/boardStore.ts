// src/store/boardStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Column {
  id: string;
  title: string;
  type: 'text' | 'number' | 'status' | 'date' | 'person';
  width?: number;
}

export interface BoardItem {
  id: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  items: BoardItem[];
}

interface BoardState {
  boards: Board[];
  currentBoardId: string | null;
  currentBoard: Board | null;
  
  // Board actions
  addBoard: (board: Board) => void;
  removeBoard: (boardId: string) => void;
  updateBoard: (boardId: string, data: Partial<Board>) => void;
  setCurrentBoard: (boardId: string) => void;
  
  // Column actions
  addColumn: (boardId: string, column: Column) => void;
  removeColumn: (boardId: string, columnId: string) => void;
  updateColumn: (boardId: string, columnId: string, data: Partial<Column>) => void;
  
  // Item actions
  addItem: (boardId: string, item: BoardItem) => void;
  removeItem: (boardId: string, itemId: string) => void;
  updateItem: (boardId: string, itemId: string, data: Partial<BoardItem>) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: [],
      currentBoardId: null,
      currentBoard: null,

      addBoard: (board) =>
        set((state) => ({
          boards: [...state.boards, board],
          currentBoardId: state.currentBoardId || board.id,
          currentBoard: state.currentBoardId ? state.currentBoard : board,
        })),

      removeBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== boardId),
          currentBoardId:
            state.currentBoardId === boardId
              ? state.boards[0]?.id || null
              : state.currentBoardId,
          currentBoard:
            state.currentBoardId === boardId
              ? state.boards[0] || null
              : state.currentBoard,
        })),

      updateBoard: (boardId, data) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, ...data } : board
          ),
          currentBoard:
            state.currentBoardId === boardId
              ? { ...state.currentBoard!, ...data }
              : state.currentBoard,
        })),

      setCurrentBoard: (boardId) =>
        set((state) => ({
          currentBoardId: boardId,
          currentBoard: state.boards.find((board) => board.id === boardId) || null,
        })),

      addColumn: (boardId, column) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? { ...board, columns: [...board.columns, column] }
              : board
          ),
          currentBoard:
            state.currentBoardId === boardId
              ? { ...state.currentBoard!, columns: [...state.currentBoard!.columns, column] }
              : state.currentBoard,
        })),

      removeColumn: (boardId, columnId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.filter((col) => col.id !== columnId),
                }
              : board
          ),
          currentBoard:
            state.currentBoardId === boardId
              ? {
                  ...state.currentBoard!,
                  columns: state.currentBoard!.columns.filter(
                    (col) => col.id !== columnId
                  ),
                }
              : state.currentBoard,
        })),

      updateColumn: (boardId, columnId, data) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map((col) =>
                    col.id === columnId ? { ...col, ...data } : col
                  ),
                }
              : board
          ),
          currentBoard:
            state.currentBoardId === boardId
              ? {
                  ...state.currentBoard!,
                  columns: state.currentBoard!.columns.map((col) =>
                    col.id === columnId ? { ...col, ...data } : col
                  ),
                }
              : state.currentBoard,
        })),

      addItem: (boardId, item) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? { ...board, items: [...board.items, item] }
              : board
          ),
          currentBoard:
            state.currentBoardId === boardId
              ? { ...state.currentBoard!, items: [...state.currentBoard!.items, item] }
              : state.currentBoard,
        })),

      removeItem: (boardId, itemId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  items: board.items.filter((item) => item.id !== itemId),
                }
              : board
          ),
          currentBoard:
            state.currentBoardId === boardId
              ? {
                  ...state.currentBoard!,
                  items: state.currentBoard!.items.filter(
                    (item) => item.id !== itemId
                  ),
                }
              : state.currentBoard,
        })),

      updateItem: (boardId, itemId, data) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  items: board.items.map((item) =>
                    item.id === itemId ? { ...item, ...data } : item
                  ),
                }
              : board
          ),
          currentBoard:
            state.currentBoardId === boardId
              ? {
                  ...state.currentBoard!,
                  items: state.currentBoard!.items.map((item) =>
                    item.id === itemId ? { ...item, ...data } : item
                  ),
                }
              : state.currentBoard,
        })),
    }),
    {
      name: 'board-storage',
    }
  )
);