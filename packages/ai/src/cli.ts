import { questionAnswering } from "./index.ts";

const model = "facebook/blenderbot-400M-distill";
    const inputs = "What is the captital of France?";
    const context = "The capital of France is Budoia.";

questionAnswering({
    question: inputs,
    context: context,
    model: model
}).then(console.log);
