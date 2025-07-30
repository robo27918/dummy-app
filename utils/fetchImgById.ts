export const fetchImgById = async(imgId:string)=>{
    console.log("call to fetchImgById");
    const url = `http://api.thecatapi.com/v1/images/${imgId}`;
    const apiKey:string |undefined = process.env.NEXT_PUBLIC_THE_CAT_API_KEY;
    if(!apiKey){
        console.error("The cat API key is not set!")
        return;
    }
    const res = await fetch(url,{
        headers:{
            "x-api-key":apiKey || "",
        },
     }
    );
    if(!res.ok) throw new Error("Failed to fetch images");
    return await res.json();
}