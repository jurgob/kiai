import { HfInference } from "@huggingface/inference";
const TOKEN = "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"

const hf = new HfInference(TOKEN);

export async function questionAnswering(question: string, context: string) {
    // const res = await hf.questionAnswer({
    //     model: 'deepset/roberta-base-squad2',
    //     inputs: {
    //       question,
    //       context
    //     }
    //   })
    console.log('hf',hf);
    // return await hf.chatCompletion({
    //     model: "google/gemma-2-2b-it",
    //     messages: [{ role: "user", content: "Hello, nice to meet you!" }],
    //     max_tokens: 512,
    //     temperature: 0.1,
    //   });
    
      let out = "";
      for await (const chunk of hf.chatCompletionStream({
        model: "google/gemma-2-2b-it",
            messages: [{ role: "user", content: "Hello, nice to meet you!" }],
            max_tokens: 512,
            temperature: 0.1,
      })) {
        if (chunk.choices && chunk.choices.length > 0) {
          out += chunk.choices[0].delta.content;
          process.stdout.write(out);
        }
      }
      return out



    // return await textGeneration({
    //     accessToken: TOKEN,
    //     model: 'deepset/roberta-base-squad2',
    //     inputs:{
    //         question,
    //         context 
    //     }
    // });
}

questionAnswering('What is the capital of France?', 'The capital of France is Paris.').then(console.log);
