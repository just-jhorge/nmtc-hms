import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Patient } from "../../types";

export const getPatientsInLine = async (status: string): Promise<Patient[]> => {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
        .from("records")
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false });

    if (error) console.log(error);

    return (data as any) || [];
};
