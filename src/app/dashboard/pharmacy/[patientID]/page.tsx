"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Patient } from "../../../../../types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);

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

    const drugsArray = patient?.prescription.split(", ");

    async function handlePatientDischarge() {
        try {
            const { error } = await supabase
                .from("records")
                .update({ prescription: "", status: "idle" })
                .eq("patientID", patientID);

            if (error) {
                toast({
                    title: "Error",
                    description: error.message,
                });
            }

            if (!error) {
                toast({
                    title: "Success",
                    description: "Patient successfully discharged",
                });

                router.refresh();
                router.back();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="pt-24 pb-10 container space-y-10">
            <div className="space-y-3">
                <h3 className="text-lg sm:text-2xl">Please provide prescribed drugs to {patient?.fullname},</h3>
                <p>Her prescription is as follows:</p>
            </div>
            <div className="space-y-5">
                <ul className="w-full list-decimal list-inside space-y-1">
                    {drugsArray && drugsArray.map((drug, index) => <li key={index}>{drug}</li>)}
                </ul>
                <Button size="lg" className="bg-emerald-700" onClick={handlePatientDischarge}>
                    Done
                </Button>
            </div>
        </div>
    );
}
