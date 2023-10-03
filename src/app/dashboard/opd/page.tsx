import { getPatientsInLine } from "@/actions/getPatientsInLine";
import React from "react";

export default async function page() {
    const patients = await getPatientsInLine();

    if (patients.length === 0) {
        return (
            <div>
                <h3>You have no patients in line</h3>
            </div>
        );
    }
    return (
        <div className="container py-24 space-y-5">
            <h3>Patients in line</h3>
            <ul className="space-y-2 list-disc list-inside">
                {patients.map((patient) => (
                    <li key={patient.patientID}>{patient.fullname}</li>
                ))}
            </ul>
        </div>
    );
}
