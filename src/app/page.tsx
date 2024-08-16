"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flashcardSchema } from "@/lib/schema";
import { useChat } from "ai/react";
import { experimental_useObject as useObject } from "ai/react";
import { FormEvent, useState } from "react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/generate",
    });

  const [flash, setFlash] = useState([]);

  // const { object, submit } = useObject({
  //   api: "/api/generate",
  //   schema: flashcardSchema,
  // });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e, {
      data: { prompt: input },
    });

    // submit(text);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit}>
        <Input
          // onChange={(e) => setText(e.target.value)}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          placeholder={isLoading ? "Generating . . ." : "ask something"}
        />
        <Button type="submit">Submit</Button>
      </form>

      {/* {object?.flashcards?.map((flashcard, index) => (
        <div key={index}>
          <p>{flashcard?.front}</p>
          <p>{flashcard?.back}</p>
        </div>
      ))} */}

      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
          <p>
            {message.data?.flashcards.map((flashcard, i) => (
              <div key={i}>
                <p>{flashcard.front}</p>
                <p>{flashcard.back}</p>
              </div>
            ))}
          </p>
        </div>
      ))}
    </main>
  );
}
