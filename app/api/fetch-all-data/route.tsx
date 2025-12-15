import { NextResponse } from "next/server";


    // url
const BASE = "https://a.windbornesystems.com/treasure"
const MAX_PAGE = 23

const sleep = (ms: number) => 
    new Promise(resolve => setTimeout(resolve, ms))



export async function GET(_req: Request){


//fetch with retry
const fetchWithRetry = async(url: string, retries = 5, delay = 500)  =>{

    
            for (let attempt = 1; attempt <= retries; attempt++){
                const res = await fetch(url);

                // success
                if (res.ok) return res.json()
                    
                

                //fail - eliminate client errors 
                if (res.status >= 400 && res.status < 500 && res.status !== 429){
                     throw new Error(`Non-retryable error ${res.status} for ${url}`);
                }
                // try again - max = 5
                if (attempt === retries){
                    throw new Error(`Failed after ${retries} attempts: ${url}`);
                }

                // timeout 
                await sleep(delay * attempt)

        }
     throw new Error("Unreachable");
}


const fetchAllPages = async (baseURL = BASE) => {
    const results: any[] = [];
    for (let i = 0; i <= MAX_PAGE; i++){
        const page = i.toString().padStart(2, '0');
        const url = `${baseURL}/${page}.json`

        try{
            results[i] = await fetchWithRetry(url)
        }catch(err){
            console.error(err);
            results[i] = null
        }
    }
     console.log("Pages fetched:", results.filter(Boolean).length);
     return results
}
const allPages = await fetchAllPages()
return NextResponse.json({data : allPages} , {status: 200})

}