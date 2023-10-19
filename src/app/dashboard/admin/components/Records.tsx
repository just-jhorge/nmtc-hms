import DataTable from "./data-table";
import { Button } from "@/components/ui/button";
import { getRecords } from "@/actions/getRecords";
import { recordColumns } from "./columns";

export default async function Records() {
    const patients = await getRecords();

    return (
        <div className="space-y-7">
            <div className="w-full flex items-center justify-end">
                <Button size="lg" className="bg-emerald-700">
                    Add Record
                </Button>
            </div>
            <DataTable columns={recordColumns} data={patients} />
        </div>
    );
}
