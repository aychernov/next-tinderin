import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {hash} from "bcrypt";
import * as z from "zod";


//define schema for input validation
const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(14, 'Username must be at most 14 characters'),
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(1, 'Password is required').min(6, {
        message: 'Password must be at least 6 characters',
    })
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {email, username, password} = userSchema.parse(body)

        //check exist email
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email
            }
        })
        if (existingUserByEmail){
            return NextResponse.json({
                user: null, message: "User with this email already exists",
            }, {status: 409})
        }

        //check userName exist

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username
            }
        })

        if (existingUserByUsername){
            return NextResponse.json({
                user: null, message: "User with this username already exists",
            }, {status: 409})
        }

        //if all okays
        const hashedPassword = await hash(password, 10)

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        const {password: newUserPassword, ...userWithoutPassword} = newUser


        return NextResponse.json({
            user: userWithoutPassword,
            message: "User created",
        }, {status: 201})
    } catch (e) {
        return NextResponse.json({
            message: "Something went wrong",
        }, {status: 500})
    }
}