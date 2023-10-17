import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {useToast} from "@/components/ui/use-toast";

export default async function AdminPage() {

    const session = await  getServerSession(authOptions)
    const {toast} = useToast()


    if(session?.user){
        return <h2>Admin page - welcome back <span className='text-2xl'>{session?.user?.username}</span></h2>
    }

    return <h2>Please login to see this page</h2>
}
