import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user.id;

    const { data } = await supabase.from("users").select("department").eq("user_id", userId);

    const userDepartment = data && data[0].department;

    if (!session) {
        redirect("/auth/signin");
    }

    return <Dashboard userDepartment={userDepartment}>{children}</Dashboard>;
}
