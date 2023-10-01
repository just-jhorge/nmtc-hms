import Link from "next/link";
import React from "react";

export default function page() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="container text-center space-y-5">
                <h1>Welcome</h1>
                <h3 className="text-emerald-900 text-xl sm:text-2xl">
                    Nursing and Midwifery Training College, Kumasi - HMS
                </h3>
                <div>
                    <Link href="/auth/signin">Login</Link>
                </div>
            </div>
        </div>
    );
}
