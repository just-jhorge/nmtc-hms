import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import "../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navigation/navbar";

export const metadata: Metadata = {
    title: "NMTC-HMS",
    description: "A Demo app of a Hospital Management App for NMTC, Kumasi",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    console.log(session);

    return (
        <html lang="en">
            <body>
                {session && <Navbar />}
                {children}
            </body>
        </html>
    );
}
