"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import NewPatientForm from "./components/NewPatientForm";
import ReturningPatientForm from "./components/ReturningPatientForm";

export default function Records() {
    const [newUser, setNewUser] = useState(false);

    useEffect(() => {
        // console.log(newUser);
    }, [newUser]);

    return (
        <div className="container py-24 flex flex-col gap-8">
            <div className="space-x-5">
                <Button onClick={() => setNewUser(true)}>New Patient</Button>
                <Button onClick={() => setNewUser(false)}>Returning Patient</Button>
            </div>
            {newUser && <NewPatientForm />}
            {!newUser && <ReturningPatientForm />}
        </div>
    );
}
