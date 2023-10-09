import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { User } from "../../types";

export const getUsers = async (): Promise<User[]> => {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });

    if (error) console.log(error);

    return (data as any) || [];
};
