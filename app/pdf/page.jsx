"use client";

import React, { useState } from "react";
import ResultWithSources from "../components/ResultWithSources";
import PromptBox from "../components/PromptBox";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Title from "../components/Title";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ButtonContainer from "../components/ButtonContainer";
import UploadFile from "app/components/UploadFile";
import "../globals.css";

// This functional component is responsible for loading PDFs
const PDFLoader = () => {
  // Managing prompt, messages, error states, and uploaded file name
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi! What would you like to know?",
      type: "bot",
    },
  ]);
  const [error, setError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState(""); // State for the uploaded file name

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (endpoint) => {
    try {
      console.log(`sending ${prompt}`);
      console.log(`using ${endpoint}`);

      const response = await fetch(`/api/${endpoint}`, {
        method: "GET",
      });

      const searchRes = await response.json();
      console.log(searchRes);
      setError(""); // Clear any existing error messages
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSubmitPrompt = async (endpoint) => {
    try {
      setPrompt("");

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchRes = await response.json();
      console.log({ searchRes });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.result.text,
          type: "bot",
          sourceDocuments: searchRes.result.sourceDocuments,
        },
      ]);

      setError(""); // Clear any existing error messages
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <Title headingText="CHAT-PDF" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Ask Anything about PDF"
              boldText="Ask your question?"
              description="This tool will let you ask anything contained in a PDF document. This tool uses Embeddings, Pinecone, VectorDBQAChain, and VectorStoreAgents."
            />
            <UploadFile endpoint={"pdf-upload"} text={"Upload Book 📙"} setUploadedFileName={setUploadedFileName} />
            {uploadedFileName && (
              <div className="mt-4 text-lg text-gray-700">
                Uploaded File: <strong>{uploadedFileName}</strong>
              </div>
            )}
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="pdf" />
            <PromptBox
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={() => handleSubmitPrompt("/pdf-query")}
              placeHolderText={"Ask your question?"}
              error={error}
            />
          </>
        }
      />
    </>
  );
};

export default PDFLoader;
