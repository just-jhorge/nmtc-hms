"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    }),
    age: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z
            .number()
            .min(1, {
                message: "Age cannot be less than 1 year",
            })
            .max(130, {
                message: "Age cannot be more than 130 years",
            })
    ),
    gender: z.string({
        required_error: "Please select your gender.",
    }),
    contact: z.string(),
    address: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
    status: z.string(),
});

export default function NewPatientForm() {
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClientComponentClient();
    const router = useRouter();
    const id = uniqid();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            age: 0,
            gender: "",
            contact: "",
            address: "",
            status: "inLine",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);

            const { error } = await supabase.from("records").insert({
                patientID: id.toUpperCase(),
                fullname: values.name,
                age: values.age,
                gender: values.gender,
                contact: values.contact,
                address: values.address,
                status: "opd",
            });

            if (!error) {
                toast({
                    title: "Success",
                    description: "Patient added to records successfully. Proceed to check vitals",
                });
                alert(`Patient ID is ${id.toUpperCase()}`);
            } else {
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "There was an error adding the patient to records, please try again.",
                });
            }

            router.refresh();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }

        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Age" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telephone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="0200000000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please enter patient's address"
                                    className="resize-none"
                                    rows={5}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {isLoading ? "Adding to records..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
}
