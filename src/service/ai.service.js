import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text
}

export default generateResponse;
