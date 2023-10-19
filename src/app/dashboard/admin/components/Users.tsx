import DataTable from "./data-table";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/actions/getUsers";
import { userColumns } from "./columns";
import Link from "next/link";

export default async function Users() {
    const users = await getUsers();

    return (
        <div className="space-y-7">
            <div className="w-full flex items-center justify-end">
                <Button size="lg" className="bg-emerald-700">
                    <Link href="/dashboard/admin/add-user">Add User</Link>
                </Button>
            </div>
            <DataTable columns={userColumns} data={users} />
        </div>
    );
}
