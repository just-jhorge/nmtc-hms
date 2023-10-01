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

export default function Navbar() {
    const router = useRouter();
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
        <nav className="fixed w-full bg-emerald-700 h-16 flex items-center justify-center">
            <div className="container flex items-center justify-between">
                <Link href="/" className="font-bold text-white tracking-widest flex items-center gap-2">
                    <MdLocalHospital size={26} color="red" /> <p className="text-sm sm:text-xl">NMTC-HMS</p>
                </Link>
                <div className="hidden sm:flex items-center gap-10">
                    <ul className="flex items-center gap-5 text-white">
                        <Link href="/">
                            <li>Home</li>
                        </Link>
                        <Link href="/">
                            <li>About</li>
                        </Link>
                        <Link href="/">
                            <li>Services</li>
                        </Link>
                        <Button onClick={handleLogout} className="bg-red-500">
                            Logout
                        </Button>
                    </ul>
                </div>
                <div className="block sm:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <HiMenuAlt3 className="text-white text-4xl border-2 border-white rounded-md active:outline-none" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="outline-none right-4">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Home</DropdownMenuItem>
                            <DropdownMenuItem>About</DropdownMenuItem>
                            <DropdownMenuItem>Services</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={handleLogout} variant="destructive" className="w-full">
                                    Logout
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
