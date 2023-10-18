import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {HandMetal} from "lucide-react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {SignOutButon} from "@/components/SignOutButon";
import {ToggleTheme} from "@/components/ToggleTheme";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

export const NavBar = async () => {

    const session = await getServerSession(authOptions)
    const avatar = session?.user?.image

    return (
        <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
            <div className='container flex items-center justify-between'>
                <Link href="/"> <HandMetal/> </Link>
                <div className='flex items-center justify-center'>
                    <ToggleTheme/>
                    {avatar ? (
                    <Image src={session?.user?.image || ''} alt={'Avatar'} width={32} height={32} className='rounded-full mr-2'/> )
                        :
                        (<Icon name="scan-face" width={32} height={32} className='mr-2'/>)}

                    {session?.user ? (
                            <SignOutButon/>) :
                        <Link className={buttonVariants()} href="/sign-in"> Sign in </Link>}

                </div>
            </div>
        </div>
    );
};