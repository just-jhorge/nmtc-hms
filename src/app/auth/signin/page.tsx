"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    staffEmail: z.string().email().nonempty(),
    password: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        })
        .nonempty(),
});

export default function Home() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const supabase = createClientComponentClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            staffEmail: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const { data: authData, error } = await supabase.auth.signInWithPassword({
                email: values.staffEmail,
                password: values.password,
            });

            if (!error) {
                const { data: userData, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("user_id", authData.user?.id)
                    .single();

                if (userData) {
                    router.refresh();
                    router.push(`/dashboard/${userData.department}`);
                    setLoading(false);
                }
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center px-3 space-y-10">
            <h3 className="text-xl sm:text-3xl text-center text-emerald-900 dark:text-emerald-600 tracking-wider max-w-sm sm:max-w-lg">
                Nursing and Midwifery Training College, Kumasi - HMS
            </h3>
            <div className="bg-white dark:bg-neutral-800 w-full sm:w-1/5 p-5 sm:p-10 shadow-sm rounded-md space-y-5">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <p className="text-gray-400 text-sm">Please login to get started</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="staffEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Staff Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Staff Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-emerald-800">
                            {loading ? "Loading..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
