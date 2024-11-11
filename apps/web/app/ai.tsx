"use client";

import React, { useState } from 'react';
import { HfInference } from "@huggingface/inference";
import { Button } from "@repo/ui/components/ui/button";

const TOKEN = "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"

export const AiComponent: React.FC = () => {
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    // const model = "gpt2";
    const model = "facebook/blenderbot-400M-distill";
    const inputs = "What is the captital of France?";
    const context = "The capital of France is Budoia.";
    const fetchResponse = async () => {
        console.log("fetching response");
        try {
            setLoading(true);
            setError("");
            const hf = new HfInference(TOKEN);
            // const result = await hf.textGenerationStream({
            //     model: 'microsoft/DialoGPT-large',
            //     inputs: {
            //       past_user_inputs: ['Which movie is the best ?'],
            //       generated_responses: ['It is Die Hard for sure.'],
            //       text: 'Can you explain why ?'
            //     }
            //   })
            const prompt = `${context}\n\n${inputs}`;

            const result = await hf.textGeneration({
                model,
                inputs: prompt,
                parameters: {
                  max_new_tokens: 50,  // Max number of new tokens to generate
                  temperature: 0.1,    // Sampling temperature for text diversity
                },
              });
            // const result = await hf.chatCompletion({
            //     model: "google/gemma-2-2b-it",
            //     messages: [{ role: "user", content: "Hello, nice to meet you!" }],
            //     max_tokens: 512,
            //     temperature: 0.1,
            // });
            setLoading(false);
            setResponse(JSON.stringify(result, null, 2));
            // const choice = result.choices[0];
            // if (!result.choices ||! result.choices[0] || ) {
            //     // throw new Error("No response from AI");
            // }
            // console.log("fetching response");
            // if( choice !== undefined){
            //     console.log("choice",choice);
                // setResponse(JSON.stringify(result));
            // }
        }catch (error) {
            setError(error + "");
            setLoading(false);
            console.error("Error fetching AI response:", error);
        }
    };

    return (
        <div className="space-y-4 flex flex-col">
            <div><b>Model: </b> {model}</div>
            <div><b>Context:</b> {context}</div>
            <div><b>inputs:</b> {inputs}</div>

            <div>
                <Button onClick={fetchResponse}>Ask {loading ? " Loading..." : ""}</Button>
            </div>
            <div>
            {response && <div>{response}</div>}
            </div>
            {error && <div className="text-red-700 bg-red-100 p-4 rounded">
                {error}
            </div>}
        </div>
    );
};

