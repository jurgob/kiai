// import { questionAnswering } from "@huggingface/inference";
"use client";
import {HTMLProps, forwardRef} from "react";
// import { useFormState } from "react-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./formSchema";

import Title from "@repo/ui/components/ui/title";
import { z } from "zod";
import { useFormState } from "react-dom";

import { onSubmitAction } from "./formSubmit";
import { useForm ,} from "react-hook-form";
import { useRef } from "react";

type FormSchema =z.output<typeof schema>


const TextArea = forwardRef<HTMLTextAreaElement, HTMLProps<HTMLTextAreaElement> & { error?: string, label: string }>(
    (props, ref) => {
        const { name, label, error, ...taProps } = props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <textarea
                    id={name}
                    name={name}
                    ref={ref}
                    {...taProps}
                    className={`w-full p-2 border rounded-md shadow-sm focus:outline-none  ${error ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-transparent'}`}
                />
                {error && <p className="text-red-600">{error}</p>}
            </div>
        );
    }
);
TextArea.displayName = "TextArea";


const MessageBar = ({ message }: { message: string }) => {
    return (
        <div className="bg-green-100 border border-green-500 p-2 rounded">
             
            {message}
        </div>
    );  
};
export default function QuestionAnswering() {
   
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },

    } = useForm<FormSchema>({
        resolver: zodResolver(schema),
    });


    // const onSubmit = async (data: FormSchema) => {
    //     await handleSubmit(data);  
    // };

    const [state, formAction] = useFormState(onSubmitAction, {
        message: "",
      });
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div className="p-4">
            <Title>Question Answering</Title>
                {state?.message !== "" && !state.issues && (
                    <MessageBar message={state.message} />
                )}
                {state?.issues && (
                    <div className="text-red-500">
                    <ul>
                        {state.issues.map((issue) => (
                        <li key={issue} className="flex gap-1">
                            <span className="text-red-500">❌</span>
                            {issue}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                <form  
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col gap-4"
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        console.log("onSubmit");
                        handleSubmit(() => {
                            console.log("handleSubmit");
                            formAction(new FormData(formRef.current!));
                        })(evt);
                    }}
                >
                    <div>
                        <label htmlFor="model">Model</label>
                        <select 
                            id="model" 
                            {...register("model")} 
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black text-white"
                        >
                            <option value="deepset/roberta-base-squad2">deepset/roberta-base-squad2</option>
                            <option value="distilbert/distilbert-base-cased-distilled-squad">distilbert/distilbert-base-cased-distilled-squad</option>
                        </select>
                        {errors.model && <p className="text-red-300" >{errors.model.message}</p>}
                    </div>
                    <TextArea label="Question"   error={errors.question?.message}  {...register("question")}  />
                    <TextArea label="Document"   error={errors.document?.message}  {...register("document")}  />
                    <button 
                        disabled={isSubmitting} 
                        type="submit" 
                        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    >
                        Submit
                    </button>
                </form>
        </div>
    );
}
