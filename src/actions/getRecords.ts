import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Patient } from "../../types";

export const getRecords = async (): Promise<Patient[]> => {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.from("records").select("*").order("created_at", { ascending: false });

    if (error) console.log(error);

    return (data as any) || [];
};
