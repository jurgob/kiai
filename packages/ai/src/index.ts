import { HfInference } from "@huggingface/inference";
const TOKEN = process.env.HF_TOKEN;

const hf = new HfInference(TOKEN);

export async function questionAnswering({question, context, model}: {question: string, context: string, model: string}) {
    // const res = await hf.questionAnswer({
    //     model: 'deepset/roberta-base-squad2',
    //     inputs: {
    //       question,
    //       context
    //     }
    //   })
    // console.log('hf',hf);
    // return await hf.chatCompletion({
    //     model: "google/gemma-2-2b-it",
    //     messages: [{ role: "user", content: "Hello, nice to meet you!" }],
    //     max_tokens: 512,
    //     temperature: 0.1,
    //   });
    
      // let out = "";
      // for await (const chunk of hf.chatCompletionStream({
      //   model: "google/gemma-2-2b-it",
      //       messages: [{ role: "user", content: "Hello, nice to meet you!" }],
      //       max_tokens: 512,
      //       temperature: 0.1,
      // })) {
      //   if (chunk.choices && chunk.choices.length > 0) {
      //     out += chunk.choices[0].delta.content;
      //     process.stdout.write(out);
      //   }
      // }
      // return out
    
      const result = await hf.textGeneration({
        model,
        inputs: `${context}  ${question}`,
        parameters: {
          max_new_tokens: 50,  // Max number of new tokens to generate
          temperature: 0.1,    // Sampling temperature for text diversity
        },
      });
      return result;

}

// questionAnswering('What is the capital of France?', 'The capital of France is Paris.').then(console.log);
