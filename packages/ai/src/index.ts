import { HfInference } from "@huggingface/inference";

const TOKEN = process.env.HF_TOKEN;

export async function createHfClient(){
  const hf = new HfInference(TOKEN);

  const questionAnswering = async ({question, context, model}: {question: string, context: string, model: string}) => {
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

  const textToImage = async ({text, model="black-forest-labs/FLUX.1-dev"}: {text: string, model?: string}) => {
    return await hf.textToImage({
      model,
      inputs: text
    });
  }


  return {
    questionAnswering,
    textToImage
  }
}