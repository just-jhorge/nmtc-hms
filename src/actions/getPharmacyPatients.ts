import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Patient } from "../../types";

export const getPharmacyPatients = async (): Promise<Patient[]> => {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
        .from("records")
        .select("*")
        .eq("status", "pharmacy")
        .order("created_at", { ascending: false });

    if (error) console.log(error);

    return (data as any) || [];
};
