import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import SSE from "express-sse";

const sse = new SSE();


export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    console.log("Query PDF");

    // Grab the user prompt
    const { input } = req.body;

    if (!input) {
      throw new Error("No input");
    }

    console.log("input received:", input);

    /* Use as part of a chain (currently no metadata filters) */

    // Initialize Pinecone

    const client = new PineconeClient();
    await client.init( {
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT
    })

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX)

    const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings, {
      pineconeIndex
    })

    const model = new OpenAI( {
      modelName: "gpt-4-0125-preview",
      streaming: true,
      callbacks : [
        {
          handleLLMNewToken(token) {
            sse.send(token, "newToken")
          }
        }
      ]
    })

    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k:1,
      returnSourceDocuments: true,
    })

    const response = await chain.call({query: input})

    // Search!

    return res.status(200).json({ result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
