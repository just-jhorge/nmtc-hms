"use client";

import { useRouter, usePathname, redirect } from "next/navigation";

interface DashboardProps {
    children: React.ReactNode;
    userDepartment: string;
}

const Dashboard: React.FC<DashboardProps> = ({ children, userDepartment }) => {
    const router = useRouter();
    const pathname = usePathname();
    const urlDepartment = pathname.split("/")[2];

    if (userDepartment === urlDepartment) {
        console.log("allowed url");
    } else {
        redirect(`/dashboard/${userDepartment}`);
    }

    return <>{children}</>;
};

export default Dashboard;
