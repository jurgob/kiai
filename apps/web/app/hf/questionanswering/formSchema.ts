import {z} from 'zod';
export const schema = z.object({
    model: z.string().min(1,"Model is required"),
    question: z.string().min(1,"Question is required"),
    document: z.string().min(1, "Document is required"),
});