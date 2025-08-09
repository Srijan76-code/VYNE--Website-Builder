import { success } from "zod";
import {Sandbox} from "@e2b/code-interpreter"

import { inngest } from "./client";
import { createAgent, gemini } from '@inngest/agent-kit';
import { withMaxDuration } from "@trpc/server/unstable-core-do-not-import";
import { getSandbox } from "./utils";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event ,step}) => {
    const sandboxId= await step.run("get-sandbox-id",async()=>{
      const sandbox=await Sandbox.create("vyne-test-2")
      return sandbox.sandboxId
    })

const codeAgent = createAgent({
  name: 'code-agent',
  system:
    'You are an expert nestjs developer.You write readable and maintainable code.You write Nexjs and React code snippets.',
  model: gemini({ model: "gemini-1.5-flash" }),
});

const { output } =await codeAgent.run(
  `Write the following snippet:${event.data.value}`,
);
const sandboxUrl=await step.run("get-sandbox-url",async()=>{
  const sandbox=await getSandbox(sandboxId)
  const host=sandbox.getHost(3000)
  return `https://${host}`
})
// console.log(output);
return {output,sandboxUrl}
// [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]
   
  },
);



