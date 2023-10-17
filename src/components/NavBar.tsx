import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {HandMetal} from "lucide-react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {SignOutButon} from "@/components/SignOutButon";
import {ToggleTheme} from "@/components/ToggleTheme";

export const NavBar = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
            <div className='container flex items-center justify-between'>
                <Link href="/"> <HandMetal/> </Link>
                <div className='flex items-center justify-center'>
                    <ToggleTheme/>
                    {session?.user ? (
                            <SignOutButon/>) :
                        <Link className={buttonVariants()} href="/sign-in"> Sign in </Link>}

                </div>
            </div>
        </div>
    );
};