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
    symptons: {};
    status: string;
}
