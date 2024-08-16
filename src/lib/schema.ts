import { z } from "zod";

// define a schema for the notifications
export const flashcardSchema = z.object({
  flashcards: z.array(
    z.object({
      front: z.string(),
      back: z.string(),
    })
  ),
});
