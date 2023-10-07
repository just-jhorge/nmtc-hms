"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Patient } from "../../../../../types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { consultaionFormSchema } from "@/schema/formSchemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);

    const router = useRouter();
    const { patientID } = useParams();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getPatient = async () => {
            const { data, error } = await supabase.from("records").select("*").eq("patientID", patientID).single();

            if (!error) {
                setPatient(data);
            } else {
                console.log(error);
            }
        };

        getPatient();

        // eslint-disable-next-line
    }, [patientID]);

    const form = useForm<z.infer<typeof consultaionFormSchema>>({
        resolver: zodResolver(consultaionFormSchema),
        defaultValues: {
            symptoms: "",
            prescription: "",
        },
    });

    async function onSubmit(values: z.infer<typeof consultaionFormSchema>) {
        try {
            if (values.labs === "pharmacy" && !values.prescription) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Please enter a prescription as patient will not be taking any lab tests.",
                });

                return;
            } else if (values.labs === "lab" && values.prescription) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "Please wait till after the lab test before prescribing a drug for your patient. Clear prescription",
                });

                return;
            }

            console.log(values);

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container pt-20 sm:pt-24 space-y-3 sm:space-y-10">
            <div className="space-y-1.5 sm:space-y-2.5">
                <h3 className="text-lg sm:text-2xl">You are currently consulting {patient?.fullname},</h3>
                <p className="sm:text-xl">Vitals are as follows:</p>
                <ul className="text-sm sm:text-base grid grid-cols-2 gap-x-3 sm:space-y-1 ml-5 list-disc">
                    <li>Blood Glucose: {patient?.vitals.bloodGlucose}</li>
                    <li>Blood Pressure: {patient?.vitals.bloodPressure}</li>
                    <li>Body Temperature: {patient?.vitals.bodyTemperature}</li>
                    <li>Oxygen Saturation: {patient?.vitals.oxygenSaturation}</li>
                    <li>Pulse Rate: {patient?.vitals.pulseRate}</li>
                    <li>Respiration: {patient?.vitals.respiration}</li>
                </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 w-full">
                <div className="w-full sm:w-3/4 py-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="symptoms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Symptons</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Please type patient symptons here"
                                                className="resize-none"
                                                rows={8}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="prescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Presciption</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Please type patient's prescription"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="labs"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Does patient need a lab test?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="lab" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="pharmacy" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-emerald-700">
                                {isLoading ? "Updating records..." : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
