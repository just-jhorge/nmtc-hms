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
