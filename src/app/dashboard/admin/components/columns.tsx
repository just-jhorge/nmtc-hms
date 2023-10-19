"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Patient, User } from "../../../../../types";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "othernames",
        header: "Other Names",
    },
    {
        accessorKey: "lastname",
        header: "Last Name",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        id: "actions",
        header: "Action",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <FiMoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const recordColumns: ColumnDef<Patient>[] = [
    {
        accessorKey: "fullname",
        header: "Full Name",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "contact",
        header: "Contact",
    },
    {
        id: "actions",
        header: "Action",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <FiMoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Record</DropdownMenuItem>
                        <DropdownMenuItem>Delete Record</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
