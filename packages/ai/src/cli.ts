import { createHfClient } from "./index.ts";
import crypto from "node:crypto";
import os from "node:os";
import fs from "node:fs";
const model = "facebook/blenderbot-400M-distill";
const inputs = "What is the captital of France?";
const context = "The capital of France is Budoia.";

const {textToImage,summarization,documentQuestionAnswering,questionAnswering} = await createHfClient();

// questionAnswering({
//     question: inputs,
//     context: context,
//     model: model
// }).then(console.log).catch(console.error);;

textToImage({
    text: "a picture of a FANTASTIC CITY WITH CREAPY ANIMALS AND COLOURFUL FAIRIES DANCING UNDER THE STARS AND PRAYING TO A CELESTIAL HOST IN THE CHRISTIAN TRADITION"
}).then(async (res) => {
    const fileName = os.tmpdir() + `/downloaded_image_${crypto.randomUUID()}.jpg`;
    fs.writeFileSync(fileName, Buffer.from(await res.arrayBuffer()));
    console.log(`image saved to ${fileName}`);    
}).catch(console.error);

// summarization({
//     inputs: "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930.",
// }).then(console.log).catch(console.error);

// documentQuestionAnswering({
//     url: "https://huggingface.co/spaces/impira/docquery/resolve/2359223c1837a7587402bda0f2643382a6eefeab/invoice.png",
//     question: "What is the invoice total?",
// }).then(console.log).catch(console.error);


// questionAnswering({
//     question: "What is the captital of France?",
//     context: "The capital of France is Budoia."
// }).then(console.log).catch(console.error);