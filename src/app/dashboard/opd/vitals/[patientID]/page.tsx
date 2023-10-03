import React from "react";

export default function page() {
    return (
        <div className="container py-24 space-y-5">
            <h3 className="text-xl sm:text-2xl font-semibold">Vitals for George Sarpong Afrifa</h3>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 w-full bg-yellow-500">
                <div className="w-full sm:w-4/5 bg-green-500 py-5">Form for inputs go here</div>
                <div className="w-full sm:w-1/5 bg-gray-50 shadow-md rounded-sm px-2.5 py-5">
                    System suggestion goes here
                </div>
            </div>
        </div>
    );
}
