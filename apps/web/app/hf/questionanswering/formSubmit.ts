"use server";
import { schema } from "./formSchema";
import { createHfClient } from "@repo/ai";
export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  result?: { answer: string }; 
};


export async function onSubmitAction(
  prevState: FormState,
  data: FormData
){
  const { questionAnswering} =  await createHfClient();
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key]?.toString()||"";
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

    const { model, question, document } = parsed.data;
    const result = await questionAnswering({ model, question, context: document });
    const answer = result.answer
    return { message: "success" , result: { answer } };
}