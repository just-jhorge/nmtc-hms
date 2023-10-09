import { getPatientsInLine } from "@/actions/getPatientsInLine";
import React from "react";

export default function page() {
    const patients = getPatientsInLine("lab");

    return <div className="container py-16">Lab Page</div>;
}
