import React from "react";
import { Button } from "@/components/ui/button";
import { recordColumns } from "../columns";
import DataTable from "../data-table";
import { getRecords } from "@/actions/getRecords";

export default async function Records() {
    const patients = await getRecords();

    return (
        <div className="space-y-7">
            <div className="w-full flex items-center justify-end">
                <Button size="lg" className="bg-emerald-700">
                    Add User
                </Button>
            </div>
            <div>
                <DataTable columns={recordColumns} data={patients} />
            </div>
        </div>
    );
}
