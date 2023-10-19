import Link from "next/link";
import { getPatientsInLine } from "@/actions/getPatientsInLine";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function page() {
    const patients = await getPatientsInLine("lab");

    if (patients.length === 0) {
        return (
            <div className="container py-24">
                <h3>You have no patients in line</h3>
            </div>
        );
    }

    return (
        <div className="container py-24 space-y-5">
            <h3>Patients in line</h3>
            <Table className="text-xs sm:text-base">
                <TableCaption>A list of all patients in line.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[20px] sm:w-[60px]">S/N</TableHead>
                        <TableHead className="w-[60px] sm:w-[150px]">Patient ID</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.patientID}>
                            <TableCell className="font-bold">{patients.indexOf(patient) + 1}</TableCell>
                            <TableCell>{patient.patientID}</TableCell>
                            <TableCell>{patient.fullname}</TableCell>
                            <TableCell>{patient.contact}</TableCell>
                            <TableCell className="text-right">
                                <Link
                                    href={`/dashboard/consulting/${patient.patientID}`}
                                    className="bg-emerald-500 hover:bg-emerald-800 transition text-white flex items-center justify-center text-center px-2 py-1 rounded-sm shadow-sm font-bold text-xs sm:text-base"
                                >
                                    Examine
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
