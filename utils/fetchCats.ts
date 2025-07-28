export const fetchCats = async(limit=60)=>{
    console.log("call to fetchCats...")
    const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}`;
    const apiKey:string | undefined = process.env.NEXT_PUBLIC_THE_CAT_API_KEY;
    if(!apiKey){
        console.error("The cat API key is not set!");
        return;
    }
    const res = await fetch(url,
        {
            headers:{
                "x-api-key":process.env.NEXT_PUBLIC_THE_CAT_API_KEY ||"",
            },

        }
    );
    if(!res.ok) throw new Error("Failed to fetch images")
    return await res.json()
}