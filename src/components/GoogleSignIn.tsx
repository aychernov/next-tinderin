import {Button} from "@/components/ui/button";
import {FC} from "react";
import {signIn} from "next-auth/react";

interface IGoogleSignInProps {
    children: React.ReactNode
}
export const GoogleSignIn: FC<IGoogleSignInProps> = ({children}) => {


 const loginWithGoogle = () => {
  signIn('google', {callbackUrl: 'http://localhost:3000/admin'})
 }


 return (
  <Button className="w-full mt-3 text-center text-sm" onClick={loginWithGoogle}>
   {children}
  </Button>
 );
};