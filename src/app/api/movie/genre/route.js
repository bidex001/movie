import Tmdb from "../../tmdb";
import { NextResponse } from "next/server";

export async function GET(request){
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    if(!id){
        return NextResponse.json({message: "ID is required"},{status:400})
    }
    try {
        const res = await Tmdb.get("/discover/movie",{
            params:{
                with_genres: id
            }
        })
        return NextResponse.json(res.data,{status:200})
    } catch (error) {
        return NextResponse.json(
            {
                message:"Error Fetching Data",
            },
            {status:500}
        )
    }
}