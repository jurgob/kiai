import { createHfClient } from "./index.ts";
import crypto from "node:crypto";
import os from "node:os";
import fs from "node:fs";
const model = "facebook/blenderbot-400M-distill";
const inputs = "What is the captital of France?";
const context = "The capital of France is Budoia.";

const {questionAnswering,textToImage} = await createHfClient();

// questionAnswering({
//     question: inputs,
//     context: context,
//     model: model
// }).then(console.log).catch(console.error);;

textToImage({
    text: "a picture of a green bird"
}).then(async (res) => {
    const fileName = os.tmpdir() + `/downloaded_image_${crypto.randomUUID()}.jpg`;
    fs.writeFileSync(fileName, Buffer.from(await res.arrayBuffer()));
    console.log(`image saved to ${fileName}`);    
}).catch(console.error);

console.log();