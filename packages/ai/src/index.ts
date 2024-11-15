import { HfInference,  } from "@huggingface/inference";
const TOKEN = process.env.HF_TOKEN;
export type QuestionAnsweringResponse = typeof HfInference
// type QuestionAnsweringResponse =  Awaited<ReturnType<typeof hf.questionAnswering>>
export async function createHfClient(){
  const hf = new HfInference(TOKEN);

  const textGeneration = async ({question, model}: {question: string, context: string, model: string}) => {
    const result = await hf.textGeneration({
      model,
      inputs: question,
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

  const summarization = async ({inputs="", model='facebook/bart-large-cnn'}) => {
    return await hf.summarization({
      model ,
      inputs,
      parameters: {
        max_length: 100
      }
    }) 
  }


  const documentQuestionAnswering = async ({model='impira/layoutlm-document-qa', question, url}: {model?: string, question: string, url: string}) => {
    return await hf.documentQuestionAnswering({
      model,
      inputs: {
        question,
        image: await (await fetch(url)).blob()
      }
    })
  }


  const questionAnswering = async ({model='deepset/roberta-base-squad2', question, context}: {model?: string, question: string, context: string}) => {
    return await hf.questionAnswering({
      model,
      inputs: {
        question, 
        context
      }
    })
  }

  return {
    questionAnswering,
    textGeneration,
    textToImage,
    summarization,
    documentQuestionAnswering
  }
}