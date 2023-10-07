"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Patient } from "../../../../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { vitalsFormSchema } from "@/schema/formSchemas";

export default function Page() {
    const patientHealth = "good";
    const [isLoading, setIsLoading] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);

    const router = useRouter();
    const supabase = createClientComponentClient();

    const { patientID } = useParams();

    useEffect(() => {
        const getPatient = async () => {
            const { data, error } = await supabase.from("records").select("*").eq("patientID", patientID).single();

            if (error) console.log(error);

            if (data) setPatient(data);
        };

        getPatient();

        // eslint-disable-next-line
    }, [patientID]);

    const form = useForm<z.infer<typeof vitalsFormSchema>>({
        resolver: zodResolver(vitalsFormSchema),
        defaultValues: {
            bloodPressure: 0,
            bodyTemperature: 0,
            oxygenSaturation: 0,
            bloodGlucose: 0,
            pulseRate: 0,
            respiration: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof vitalsFormSchema>) {
        try {
            setIsLoading(true);

            const { error } = await supabase
                .from("records")
                .update({ vitals: { values }, status: "consulting" })
                .eq("patientID", patient?.patientID);

            if (!error) {
                toast({
                    title: "Success.",
                    description: "Patient vitals added successfully",
                });
            }

            router.refresh();
            router.back();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container py-24 space-y-5">
            <h3 className="text-xl sm:text-2xl font-semibold">Checking vitals for {patient?.patientID}</h3>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 w-full">
                <div className="w-full sm:w-3/4 py-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="bloodPressure"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Pressure (mmHg)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Blood Pressure" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bodyTemperature"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Body Temperature (&deg;C)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Body Temperature" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="oxygenSaturation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Oxygen Saturation (%)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Oxygen Saturation" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bloodGlucose"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Glucose Level (mmol/L)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Blood Glucose Level" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pulseRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pulse Rate (bpm)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Pulse Rate" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="respiration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Respiration (bpm)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Respiration" {...field} />
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
                </div>
                <div
                    className={`w-full sm:w-1/4 ${
                        patientHealth === "good" ? "bg-green-300" : "bg-red-400"
                    } shadow-md rounded-sm px-2.5 py-5`}
                >
                    System suggestion goes here
                </div>
            </div>
        </div>
    );
}
