import Link from "next/link";
import React from "react";

export default function page() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="text-center">
                <h1>Welcome</h1>
                <h3>Nursing and Midwifery Training College, Kumasi - HMS</h3>
                <Link href="/auth">Login</Link>
            </div>
        </div>
    );
}
