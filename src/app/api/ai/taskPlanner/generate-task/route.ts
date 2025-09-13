import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY_DEV;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a task recommender for a Task Planner app. 
The user will provide a topic, and you should generate a list of 6 tasks based on that topic. 
Each task must have the following structure: "title", "description", "category" (one of Work, Personal, Health, or Goal). 

The topic is: ${topic}

Return the tasks strictly as a JSON array, in English, like this:

[
  {
    "title": "Task title here",
    "description": "Description here",
    "category": "Work | Personal | Health | Goal"
  }
]
No extra text or explanation, only the JSON array.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const startIndex = responseText.indexOf('[');
    const endIndex = responseText.lastIndexOf(']');

    if (startIndex === -1 || endIndex === -1) {
      return NextResponse.json({ error: "Invalid response format from AI: JSON array not found", raw: responseText }, { status: 500 });
    }
    
    const jsonString = responseText.substring(startIndex, endIndex + 1);
    
    try {
      const tasks = JSON.parse(jsonString);
      return NextResponse.json({ suggestions: tasks });
    } catch (parseError) {
      return NextResponse.json({ error: "Invalid JSON response from AI after cleaning: " + parseError, raw: jsonString }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in generate-task API:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: `Internal Server Error: ${errorMessage}` }, { status: 500 });
  }
}