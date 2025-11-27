import Tmdb from "../tmdb";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request){
    const {searchParams} =  new URL(request.url)
    const id = searchParams.get("id")

    if(!id){
        return NextResponse.json({message:"invalid id"},{status:400})
    }

    try {
        const combineResponse = await Tmdb.get(`/person/${id}/combined_credits`)
        const detailResponse = await Tmdb.get(`/person/${id}`)
        return NextResponse.json({
            detail : detailResponse.data,
            combine:combineResponse.data
        },{status:200})
    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }
}