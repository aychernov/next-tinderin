import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className='w-full flex flex-col container p-20'>
        <h1 className='text-xl'>Home page</h1>
            <div className='flex gap-2'>
                <Link href='/admin' className={buttonVariants()}> Open Admin page </Link>
                <Link href='/cars' className={buttonVariants()}> Open Cars page </Link>
                <Link href='/todo' className={buttonVariants()}> Open Todo page </Link>
            </div>



            {/*<h2>Client Session:</h2>*/}
            {/*<User/>*/}

            {/*<h2>Server Session</h2>*/}
            {/*{JSON.stringify(session)}*/}
        </div>
    )
}
