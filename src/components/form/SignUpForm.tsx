"use client"

import {zodResolver} from "@hookform/resolvers/zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";

import * as z from "zod"
import Link from "next/link";
import {GoogleSignIn} from "@/components/GoogleSignIn";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

const formSchema = z.object({
    username: z.string().min(1, 'Username is required').max(14, 'Username must be at most 14 characters'),
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(1, 'Password is required').min(6, {
        message: 'Password must be at least 6 characters',
    }),
    confirmPassword: z.string().min(1, 'Confirm Password is required').min(6, 'Confirm Password must be at most 6 characters'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })
export default function SignUpForm() {
    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                ContentType: 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
            }),
        })

        if (response.ok) {
            router.refresh()
            router.push('/sign-in')
        } else {
            toast({
                title: "Error",
                description: 'Oopps...try again',
                duration: 3000,
                variant: "destructive",
            })        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="JohnDoe" {...field} type='text'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                                    <Input placeholder="***" {...field} type='password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="***" {...field} type='password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type="submit">Sign Up</Button>
            </form>

            <GoogleSignIn> Sign up with Google </GoogleSignIn>
            <p className="mt-3 text-center text-sm text-gray-500">
                Have already an account?
                <Link
                    href="/sign-in"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                > Login </Link>
            </p>
        </Form>
    )
}