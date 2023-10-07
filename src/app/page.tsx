import Link from "next/link";
import React from "react";

export default function page() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-neutral-900">
            <div className="container flex flex-col items-center justify-center text-center space-y-5">
                <h1>Welcome</h1>
                <h3 className="text-emerald-900 dark:text-emerald-600 text-xl sm:text-4xl max-w-xl text-center">
                    Nursing and Midwifery Training College, Kumasi - HMS
                </h3>
                <Link href="/auth/signin">Login</Link>
            </div>
        </div>
    );
}
