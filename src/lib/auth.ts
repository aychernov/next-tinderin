import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {db} from "@/lib/db";
import {compare} from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        //@ts-ignore
        {
            id: "steam",
            name: "Steam",
            type: "oauth",
            clientSecret: process.env.STEAM_SECRET,
            clientId: process.env.STEAM_CLIENT_ID,
            authorization: {
                url: "https://steamcommunity.com/openid/login",
                params: {
                    "openid.ns": "http://specs.openid.net/auth/2.0",
                    "openid.mode": "checkid_setup",
                    "openid.return_to": `${process.env.NEXTAUTH_URL}/api/v1/auth/callback/steam`,
                    "openid.realm": `${process.env.NEXTAUTH_URL}`,
                    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
                    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
                }
            }},
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email@exp.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existingUser = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!existingUser) {
                    return null
                }

                if (existingUser.password) {
                    const passwordMatch = await compare(credentials.password, existingUser.password)
                    if (!passwordMatch) {
                        return null
                    }
                }

                return {
                    id: existingUser.id + '',
                    username: existingUser.username,
                    email: existingUser.email
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            console.log("JWT: ", token, user)
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({session, token}) {
            console.log("SESSION: ", session, token)
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username

                }
            }
        },
    }
}