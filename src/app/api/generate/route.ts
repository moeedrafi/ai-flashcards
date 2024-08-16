import { z } from "zod";
import { NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, streamObject } from "ai";
import { flashcardSchema } from "@/lib/schema";

const systemPrompt = `
You are a flashcard creator.  Your task is to generate concise and effective 
flashcards based on the given topic or content.  Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambigious phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format
{
    "flashcards": [{
        "front": str,
        "back": str
    }]
}
`;

export async function POST(req: Request) {
  const data = await req.text();
  const openai = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const { partialObjectStream } = await streamObject({
    model: openai("llama-3.1-8b-instant"),
    schema: z.object({
      flashcards: z.array(
        z.object({
          front: z.string(),
          back: z.string(),
        })
      ),
    }),
    // prompt: systemPrompt + " " + data,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: data,
      },
    ],
  });

  for await (const partialObject of partialObjectStream) {
    console.log(partialObject);

    return NextResponse.json(partialObject);
  }

  // const result = await generateObject({
  //   model: openai("llama-3.1-8b-instant"),
  //   schema: flashcardSchema,
  //   // system: systemPrompt,
  //   prompt: "Generate questions for flashcards in this context: " + data,
  // });

  // console.log((await result.object).flashcards);

  // return NextResponse.json(result);

  //   console.log(JSON.stringify(result.object.flashcards, null, 2));
  //   return NextResponse.json(result.object.flashcards);

  //   console.log(JSON.stringify(result.object.flashcard, null, 2));

  //   const result = await streamText({
  //     model: openai("llama-3.1-8b-instant"),
  //     messages: convertToCoreMessages(message),
  //   });

  //   return result.toDataStreamResponse();
}
