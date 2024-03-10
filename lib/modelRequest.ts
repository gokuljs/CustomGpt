import OpenAI from "openai";
import { toast } from "sonner";

function submitModelRequest(
  currentQuestion: string,
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  setMessages: (messages: OpenAI.Chat.ChatCompletionMessageParam[]) => void,
  setLoading: (loading: boolean) => void, // Added this parameter to manage loading state
  abortController: AbortController
) {
  const newMessage: OpenAI.Chat.ChatCompletionMessageParam = {
    role: "user",
    content: currentQuestion,
  };
  const newMessages = [...messages, newMessage];
  setMessages(newMessages);
  setLoading(true);
  // Use the api/chat route to get StreamingTextResponse
  fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages: newMessages }),
    signal: abortController.signal,
  }).then((response) => {
    if (response.body) {
      const reader = response.body.getReader();
      let responseText = "";
      const stream = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setLoading(false);
                break;
              }
              const chunk = new TextDecoder().decode(value);
              responseText += chunk;
              setMessages([
                ...newMessages,
                { role: "assistant", content: responseText },
              ]);
              controller.enqueue(value);
            }
          } catch (error) {
            if ((error as Error).name === "AbortError") {
              toast("Fetch request was aborted by the user");
            } else {
              // Handle other fetch errors
              console.error("Fetch error:", error);
              toast("Fetch error");
            }
            setLoading(false);
          } finally {
            controller.close();
            reader.releaseLock();
          }
        },
      });
      return new Response(stream);
    }
  });
}

export default submitModelRequest;
