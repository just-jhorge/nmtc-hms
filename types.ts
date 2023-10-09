export interface Patient {
    patientID: string;
    fullname: string;
    age: number;
    gender: string;
    contact: string;
    address: string;
    vitals: {
        bloodGlucose: number;
        bloodPressure: number;
        bodyTemperature: number;
        oxygenSaturation: number;
        pulseRate: number;
        respiration: number;
    };
    symptoms: string | undefined;
    status: string;
    prescription: string;
}

export interface User {
    created_at: string;
    user_id: string;
    email: string;
    lastname: string;
    othernames: string;
    gender: string;
    department: string;
}

export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};
