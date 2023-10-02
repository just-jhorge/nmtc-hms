"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    patientID: z.string().min(12).max(12),
});

export default function ReturningPatientForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patientID: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Patient ID:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        });

        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="patientID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient ID</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Patient ID here"
                                    className="uppercase placeholder:capitalize"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Search for the patient in the records using his/her patient ID
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Search</Button>
            </form>
        </Form>
    );
}
