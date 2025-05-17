// // Simple API route for mini app AI chat
// import { askAI } from "../telegram/ai";

// export async function POST(req) {
//   try {
//     const { question, subject, university } = await req.json();
//     const aiResult = await askAI(question, subject, university);
//     return Response.json({ text: aiResult.text });
//   } catch (e) {
//     console.error('AI-CHAT API ERROR:', e, e?.response?.data);
//     return Response.json({ text: '⚠️ AI error. Please try again.' }, { status: 500 });
//   }
// }
