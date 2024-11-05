import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { load } from "cheerio";
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Disables the default Next.js body parser
  },
};


export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Inside the PDF handler");
    // Enter your code here
    /** STEP ONE: LOAD DOCUMENT */
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
       
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    
    const filePath = files['files[0]'][0].filepath;
    // console.log(bookData)
    // const book = "/Users/mihirmesia/Desktop/Webdev-1/openai-javascript-course/data/document_loaders/naval-ravikant-book.pdf"
    
    const loader = new PDFLoader(filePath)

    const docs = await loader.load()
    
    if (docs.length === 0) {
      console.log("no docs found");
      return
    }
    // Chunk it
    const splitter = new CharacterTextSplitter({
      separator: "",
      chunkSize: 250,
      chunkOverlap: 10,
    })

    const splitDocs = await splitter.splitDocuments(docs);

    const reducedDocs = splitDocs.map((doc) => {
      const reducedMetaData = { ...doc.metadata };
      delete reducedMetaData.pdf
      return new Document( {
        pageContent: doc.pageContent,
        metadata: reducedMetaData,
      })
    });

    // Reduce the size of the metadata

    console.log(reducedDocs[0]);
    console.log(splitDocs.length);

    /** STEP TWO: UPLOAD TO DATABASE */
    const client = new PineconeClient();
    await client.init( {
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT
    })

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX)

    await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), {
      pineconeIndex
    } )

    console.log("Successfully uploaded to database")

    // upload documents to Pinecone
    return res.status(200).json({ result: reducedDocs });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
