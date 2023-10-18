'use client';
import {Button} from "@/components/ui/button";
import {FC} from "react";
import {signIn} from "next-auth/react";

interface ISteamSignIn {
    children: React.ReactNode
}
export const SteamSignIn: FC<ISteamSignIn> = ({children}) => {


    const loginWithSteam = () => {
        signIn('steam')
    }


    return (
        <Button className="w-full mt-3 text-center text-sm" onClick={loginWithSteam}>
            {children}
        </Button>
    );
};