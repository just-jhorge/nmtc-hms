import { Button } from "@/components/ui/button";
import React from "react";
import DataTable from "../data-table";
import { userColumns } from "../columns";
import { getUsers } from "@/actions/getUsers";

export default async function Users() {
    const users = await getUsers();

    return (
        <div className="space-y-7">
            <div className="w-full flex items-center justify-end">
                <Button size="lg" className="bg-emerald-700">
                    Add User
                </Button>
            </div>
            <div>
                <DataTable columns={userColumns} data={users} />
            </div>
        </div>
    );
}
