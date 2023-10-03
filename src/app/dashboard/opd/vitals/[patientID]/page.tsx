"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Patient } from "../../../../../../types";

export default function Page() {
    const [patient, setPatient] = useState<Patient | null>(null);
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

    return (
        <div className="container py-24 space-y-5">
            <h3 className="text-xl sm:text-2xl font-semibold">Vitals for {patient?.fullname}</h3>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 w-full">
                <div className="w-full sm:w-3/4 py-5">Form for inputs go here</div>
                <div className="w-full sm:w-1/4 bg-gray-50 shadow-md rounded-sm px-2.5 py-5">
                    System suggestion goes here
                </div>
            </div>
        </div>
    );
}
