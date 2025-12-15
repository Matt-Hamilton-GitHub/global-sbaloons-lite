'use client'
import { useState, ReactNode, useEffect } from "react";
import { DataContext, DataContextType } from "./DataContext";

interface DataProviderProps {
    children: ReactNode;
}

interface IDataType { }




export function DataProvider({children} : DataProviderProps){

    const [data, setData] = useState<IDataType[] | []>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
    const fetchData = async() => {
      setIsLoading(true)
      try{

        const res = await fetch('/api/fetch-all-data');
        const json = await res.json();
        setData(json.data);
        console.table(json.data)
      }catch(err){
         console.error("Failed to fetch data", err);
      } finally{

        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

    const value : DataContextType = {
        data,
        isLoading

    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}