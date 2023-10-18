import {authOptions} from "@/lib/auth";
import {HandleBuyCourse} from "@/components/HandleBuyCourse";
import {getServerSession} from "next-auth";

export default async function AdminPage() {

    const session = await  getServerSession(authOptions)
    console.log(session?.user)


    if(session?.user){
        return (
            <div className='w-full'>
                <h2>Admin page - welcome back <span className='text-2xl'>{session?.user?.username || session?.user?.name}</span></h2>
                <HandleBuyCourse/>
            </div>
        )}

    return <h2>Please login to see this page</h2>
}
