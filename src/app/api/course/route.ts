import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import * as z from "zod";


//define schema for input validation
const userSchema = z.object({
    id: z.number()
})

export async function GET(req: Request) {
    try {
        //check exist email
        const courses = await db.course.findMany()

        if (courses){
            return NextResponse.json({
                courses, message: "Courses find",
            }, {status: 200})
        }
        if (!courses){
            return NextResponse.json({
                message: "Course not found",
            }, {status: 404})
        }


    } catch (e) {
        return NextResponse.json({
            message: "Something went wrong",
        }, {status: 500})
    }
}