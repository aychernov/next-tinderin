import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";

export const GET = async (req: Request) => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({
            error: "You must be signed in to view the protected content on this page.",
            auth: !!session
        }, {status: 500})
    }

    return NextResponse.json({
        content:
            "This is protected content. You can access this content because you are signed in.",
        auth: !!session
    }, {status: 200})
}