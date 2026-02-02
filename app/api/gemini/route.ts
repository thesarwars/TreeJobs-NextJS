import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. Gemini endpoints will return fallbacks.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function POST(req: NextRequest) {
  try {
    const { action, title, rawDescription, jobTitle, jobDesc } = await req.json();

    if (!ai || !apiKey) {
      if (action === "enhanceJobDescription") {
        return NextResponse.json({ text: rawDescription ?? "" });
      }
      if (action === "suggestArboristMessage") {
        return NextResponse.json({ text: "Hi, I'm interested in this job and would like to learn more." });
      }
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    if (action === "enhanceJobDescription") {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an expert arborist assistant. A customer is posting a job: "${title}".
Their current description is: "${rawDescription}".
Rewrite this to be more professional and include specific details an arborist would need to know (like accessibility, tree species if mentioned, proximity to power lines or buildings).
Make it clear and helpful. Keep it concise.`,
      });

      // @ts-ignore - response.text is available at runtime
      const text = typeof response.text === "function" ? response.text() : (response.text as string);
      return NextResponse.json({ text });
    }

    if (action === "suggestArboristMessage") {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a professional arborist. You are interested in a job titled "${jobTitle}" which says: "${jobDesc}".
Write a brief, professional introductory message to the customer asking for more details or expressing interest.
Do NOT include specific price quotes yet. Keep it friendly and expert.`,
      });

      // @ts-ignore - response.text is available at runtime
      const text = typeof response.text === "function" ? response.text() : (response.text as string);
      return NextResponse.json({ text });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Gemini API route error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
