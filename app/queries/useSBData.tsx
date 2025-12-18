import { useQuery } from "@tanstack/react-query";


export function useSDData(){

    const fetchAllData = async() =>{
        try{
            const res = await fetch('/api/fetch-all-data')
            const data = await res.json()
            return data.data
        }catch(err){
            return []
        }
    }
    
    return useQuery({
        queryKey: ['SBData'],
        queryFn: fetchAllData

    })
}