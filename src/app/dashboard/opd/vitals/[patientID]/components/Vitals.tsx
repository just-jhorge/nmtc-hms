"use client";

import { useParams } from "next/navigation";

export default function Vitals() {
    const params = useParams();
    console.log(params);

    return <div>Vitals</div>;
}
