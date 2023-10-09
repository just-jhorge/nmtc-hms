import { Payment } from "../../types";

export const labTests = [
    { name: "Allergy Test", value: "allergyTest" },
    { name: "Dental Test", value: "DentalTest" },
    { name: "Genetic Test", value: "geneticTest" },
    { name: "Hematology Coagulation", value: "hematologyCoagulation" },
    { name: "Hormone Test", value: "HormoneTest" },
    { name: "Immunological Test", value: "immunologicalTest" },
    { name: "Infectious Serology Test", value: "infectionsTest" },
    { name: "Clinical Chemistry Test", value: "clinicalChemistryTest" },
    { name: "Microbiological Test", value: "microbiologicalTest" },
    { name: "Tumor Marker Test", value: "tumorTest" },
    { name: "Clinical Urine Test", value: "clinicalUrineTest" },
    { name: "Vitamins, Minerals trace elements", value: "vitaminsMineralsTest" },
    { name: "Stool Analysis", value: "stoolAnalysis" },
];

export const labs = [
    { name: "Yes", value: "lab" },
    { name: "No", value: "pharmacy" },
];

export const payments: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
];
