"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MdLocalHospital } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function Navbar() {
    const router = useRouter();
    const { setTheme } = useTheme();
    const supbase = createClientComponentClient();

    const handleLogout = async () => {
        const { error } = await supbase.auth.signOut();

        if (!error) {
            router.refresh();
            router.push("/auth/signin");
        } else {
            console.log(error);
        }
    };

    return (
        <nav className="fixed z-[1000] w-full bg-emerald-600 dark:bg-emerald-800 h-16 flex items-center justify-center">
            <div className="container flex items-center justify-between">
                <div className="font-bold text-white tracking-widest flex items-center gap-2">
                    <MdLocalHospital size={26} color="red" /> <p className="text-sm sm:text-xl">NMTC-HMS</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={handleLogout} className="bg-red-500 dark:text-white">
                        Logout
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="bg-white dark:bg-neutral-800">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
