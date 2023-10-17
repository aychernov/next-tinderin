'use client'
import {SessionProvider} from "next-auth/react";
import {FC, ReactNode} from "react";

interface IProviderSession {
    children: ReactNode
}
export const AuthProviderSession: FC<IProviderSession> = ({children}) => {
 return (
    <SessionProvider>{children}</SessionProvider>
 );
};