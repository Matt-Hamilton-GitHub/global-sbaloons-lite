'use client'
import { createContext } from "react";



export interface DataContextType {
data: any[],
isLoading: boolean
}

export const DataContext = createContext<DataContextType | undefined>(undefined)