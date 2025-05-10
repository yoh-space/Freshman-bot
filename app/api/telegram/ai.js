import axios from 'axios';
import pdf from 'pdf-parse';
import fetch from 'node-fetch';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function askAI(question, subject, university) {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      text: 'AI API key is not configured.',
      quickReplies: ["Contact support"]
    };
  }

  // Step 1: Classify subject if not provided
  let detectedSubject = subject;
  if (!detectedSubject) {
    detectedSubject = await classifySubject(question);
  }

  // Step 2: Fetch PDF text for subject
  let pdfText = '';
  if (detectedSubject) {
    pdfText = await fetchSubjectPDFText(detectedSubject);
  }

  try {
    // System prompt with PDF context
    const systemPrompt = `
      You are an educational AI assistant for Ethiopian university freshmen.
      Use the following document as your main source for this answer:
      ---
      ${pdfText ? pdfText.substring(0, 4000) : 'No document found.'}
      ---
      Subject: ${detectedSubject || 'Not specified'}
      University: ${university || 'Not specified'}
      Respond in this format:
      [Main Answer]
      [Explanation with examples]
      [Related topics/quick questions]
      [Motivational closing]
    `;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'deepseek/deepseek-chat:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://yoit-solution.vercel.app',
          'X-Title': 'YoIt Education Assistant'
        }
      }
    );

    const aiResponse = response.data.choices?.[0]?.message?.content || 
      'No response received from AI.';

    return {
      text: formatResponse(aiResponse),
      quickReplies: []
    };

  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    return {
      text: error.response?.data?.error?.message || 'AI request failed. Please try again.',
      quickReplies: ["Try again", "Contact support"]
    };
  }
}

async function handleAIMessage(text, chatId, telegram) {
  try {
    await telegram.sendChatAction(chatId, 'typing');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { text: aiReply } = await askAI(text);
    await telegram.sendMessage(chatId, aiReply);
  } catch (error) {
    console.error('Error handling AI message:', error);
    await telegram.sendMessage(
      chatId,
      'Sorry, I encountered an error. Please try again later.'
    );
  }
}

function formatResponse(text) {
  // Replace subject names with Amharic, then apply Telegram Markdown styling
  let formatted = text
    .replace(/Physics/g, "ፊዚክስ")
    .replace(/Math/g, "ሒሳብ")
    .replace(/Chemistry/g, "ኬሚስትሪ")
    .replace(/Biology/g, "ባዮሎጂ")
    .replace(/Computer/g, "ኮምፒውተር")
    .replace(/Logic/g, "ሎጂክ")
    .replace(/Economics/g, "ኢኮኖሚክስ");
  formatted = formatted.replace(/[•\-\_\=\~\#\^\[\]\{\}\|\<\>\$\%\@\`]/g, '');
  formatted = formatted.replace(/^(.*?)(\n|$)/, (m, p1, p2) => `*${p1.trim()}*${p2 || ''}`);
  formatted = formatted.replace(/(Explanation:|For example:)(.*)/gi, (m, p1, p2) => `_${p1}${p2}_`);
  formatted = formatted.replace(/(Related topics:|Quick questions:)(.*)/gi, (m, p1, p2) => `*${p1}${p2}*`);
  formatted = formatted.replace(/^(Tip:|Good luck.*)$/gim, (m) => `_${m}_`);
  formatted = formatted.replace(/  +/g, ' ');
  return formatted.trim();
}

// Helper: Classify subject from question using AI
async function classifySubject(question) {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  const systemPrompt = `Classify the following question into one of these subjects: Physics, Math, Chemistry, Biology, Computer, Logic, Economics. Only return the subject name.`;
  const response = await axios.post(
    OPENROUTER_API_URL,
    {
      model: 'deepseek/deepseek-chat:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.2,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      }
    }
  );
  return response.data.choices?.[0]?.message?.content?.trim() || '';
}

// Helper: Fetch and extract text from subject PDF
async function fetchSubjectPDFText(subject) {
  const subjectMap = {
    Physics: 'physics',
    Math: 'mathematics1',
    Chemistry: 'chemistry',
    Biology: 'biology',
    Computer: 'computer',
    Logic: 'logic',
    Economics: 'economics',
  };
  const fileName = subjectMap[subject] || subject.toLowerCase();
  const url = `https://freshman-five.vercel.app/Modules/${fileName}.pdf`;
  try {
    const res = await fetch(url);
    if (!res.ok) return '';
    const buffer = await res.arrayBuffer();
    const data = await pdf(Buffer.from(buffer));
    return data.text;
  } catch (e) {
    return '';
  }
}

export { askAI, handleAIMessage };