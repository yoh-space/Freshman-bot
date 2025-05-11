// Simple API route for mini app AI chat
import { askAI } from "../telegram/ai";

export async function POST(req) {
  try {
    const { question } = await req.json();
    const aiResult = await askAI(question);
    return Response.json({ text: aiResult.text });
  } catch (e) {
    return Response.json({ text: '⚠️ AI error. Please try again.' }, { status: 500 });
  }
}
