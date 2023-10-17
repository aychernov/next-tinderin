import {Button} from "@/components/ui/button";
import {FC} from "react";

interface IGoogleSignInProps {
    children: React.ReactNode
}
export const GoogleSignIn: FC<IGoogleSignInProps> = ({children}) => {


 const loginWithGoogle = () => {
  console.log('Login google')
 }


 return (
  <Button className="w-full mt-3 text-center text-sm" onClick={loginWithGoogle}>
   {children}
  </Button>
 );
};