import * as z from "zod";

export const vitalsFormSchema = z.object({
    bloodPressure: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z
            .number()
            .min(1, {
                message: "Age cannot be less than 1 year",
            })
            .max(130, {
                message: "Age cannot be more than 130 years",
            })
    ),
    bodyTemperature: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z
            .number()
            .min(1, {
                message: "Age cannot be less than 1 year",
            })
            .max(130, {
                message: "Age cannot be more than 130 years",
            })
    ),
    oxygenSaturation: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z
            .number()
            .min(1, {
                message: "Age cannot be less than 1 year",
            })
            .max(130, {
                message: "Age cannot be more than 130 years",
            })
    ),
    bloodGlucose: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z
            .number()
            .min(1, {
                message: "Age cannot be less than 1 year",
            })
            .max(130, {
                message: "Age cannot be more than 130 years",
            })
    ),
    pulseRate: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z
            .number()
            .min(1, {
                message: "Age cannot be less than 1 year",
            })
            .max(130, {
                message: "Age cannot be more than 130 years",
            })
    ),
    respiration: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z
            .number()
            .min(1, {
                message: "Age cannot be less than 1 year",
            })
            .max(130, {
                message: "Age cannot be more than 130 years",
            })
    ),
});

export const consultaionFormSchema = z.object({
    symptoms: z.string().nonempty({
        message: "Please enter the symptoms of the patient",
    }),
    prescription: z.string(),
    labs: z.string().nonempty(),
    lab_type: z.string(),
    lab_results: z.string(),
});

export const pharmacyFormSchema = z.object({
    prescription: z.string(),
});

export const userSignupSchema = z.object({
    staffEmail: z.string().email().nonempty(),
    password: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        })
        .nonempty(),
    confirmPassword: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        })
        .nonempty(),
    lastname: z.string().nonempty(),
    othernames: z.string().nonempty(),
    department: z.string().nonempty(),
    gender: z.string({
        required_error: "Please select an email to display.",
    }),
});
