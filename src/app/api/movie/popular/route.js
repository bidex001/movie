import Tmdb from "../../tmdb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await Tmdb.get("/movie/popular")
        return NextResponse.json(res.data,{status:200})
    } catch (error) {
        return NextResponse.json(
            {message:"Error Fetching Data"},
            {status: 500}
        )
    }
}