import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import User from "@/components/User";
import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className='w-full'>
        <h1 className='text-xl'>Home page</h1>
            <Link href='/admin' className={buttonVariants()}> Open my Admin page </Link>


            <h2>Client Session:</h2>
            <User/>

            <h2>Server Session</h2>
            {JSON.stringify(session)}
        </div>
    )
}
