import { success } from "zod";
import { inngest } from "./client";
import { createAgent, gemini } from '@inngest/agent-kit';
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {

const codeAgent = createAgent({
  name: 'code-agent',
  system:
    'You are an expert nestjs developer.You write readable and maintainable code.You write Nexjs and React code snippets.',
  model: gemini({ model: "gemini-1.5-flash" }),
});

const { output } =await codeAgent.run(
  `Write the following snippet:${event.data.value}`,
);
console.log(output);
return {output}
// [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]
   
  },
);



