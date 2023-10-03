import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Patient } from "../../types";

export const getPatient = async (id: string): Promise<Patient> => {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.from("records").select("*").eq("patientID", id).single();

    if (error) console.log(error);

    return (data as any) || [];
};
