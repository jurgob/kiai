import {z} from 'zod';
export const schema = z.object({
    model: z.string().nonempty("Model is required"),
    question: z.string().nonempty("Question is required"),
    document: z.string().nonempty("Document is required"),
});