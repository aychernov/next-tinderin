"use client"

import {zodResolver} from "@hookform/resolvers/zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";

import * as z from "zod"
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {GoogleSignIn} from "@/components/GoogleSignIn";
import {SteamSignIn} from "@/components/SteamSignIn";

const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(1, 'Password is required').min(6, {
        message: 'Password must be at least 6 characters',
    })
})
export default function SignInForm() {
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const signInData = await signIn('credentials',{
            email: values.email,
            password: values.password,
            redirect: false,
        })
        console.log(signInData)
        if (!signInData?.ok) {
            toast({
                title: "Error",
                description: 'Oopps...try again',
                duration: 3000,
                variant: "destructive",
            })
        } else {
            router.refresh()
            router.push('/admin')
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@expm.com" {...field} type='email'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} type='password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>Sign In</Button>
            </form>
            <GoogleSignIn> Sign in with Google </GoogleSignIn>
            <SteamSignIn> Sign in with Steam </SteamSignIn>


            <p className="mt-3 text-center text-sm text-gray-500">
                Don`t have an account?
                <Link
                    href="/sign-up"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                > Register </Link>
            </p>
        </Form>
    )
}