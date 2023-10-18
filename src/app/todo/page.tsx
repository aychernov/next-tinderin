import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {Todos} from "@/components/Todos";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default async function Home() {
    const session = await getServerSession(authOptions)


    return (
        <div className='w-full py-2 container'>
            {session ?
                <h1 className='text-xl'>Welcome to Todo Page @<span
                    className='text-orange-700'>{session?.user?.username || session?.user?.name}</span></h1>
                : <h1 className='text-xl'>Welcome to Todo Page <p className='italic'>Autorize to see your cred.</p></h1>
            }

            <h2>My git page: <Link className={buttonVariants()} passHref href="https://github.com/aychernov">Git</Link></h2>

            <Todos/>

        </div>
    )
}
