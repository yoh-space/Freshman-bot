import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Ethiopian-themed emojis and styling
const ETHIOPIAN_THEME = {
  greeting: "ሰላም! 👋",
  welcome: "እንኳን ወደ ዮኢት የትምህርት ረዳት በደህና መጡ! 📚",
  error: "ይቅርታ! ⚠️",
  success: "ተሳክቷል! ✨",
  thinking: "እያሰብኩ... 🤔",
  subjects: ["ፊዚክስ", "ሒሳብ", "ኬሚስትሪ", "ባዮሎጂ", "ኮምፒውተር", "ሎጂክ", "ኢኮኖሚክስ"],
  universities: ["አዲስ አበባ", "ባህር ዳር", "ጅማ", "መቀሌ", "አርባ ምንጭ", "ወሎ", "ዲላ"]
};

async function askAI(question, subject, university) {
  if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
    return {
      text: `${ETHIOPIAN_THEME.error} AI API key is not configured.`,
      quickReplies: ["Contact support"]
    };
  }

  try {
    // Enhanced system prompt with Ethiopian context
    const systemPrompt = `
      You are Yoሕ (Yoh), an educational AI assistant for Ethiopian university freshmen. 
      You help students with academic questions in any subject with these specializations:
      
      - Always provide answers relevant to Ethiopian higher education context
      - Use simple English with occasional Amharic phrases (transliterated)
      - Format answers clearly with emojis and examples
      - Suggest related topics and study tips
      - Be encouraging and motivational
      - For non-academic questions, guide back to studies with cultural relevance
      
      Current context:
      - Subject: ${subject || 'Not specified'}
      - University: ${university || 'Not specified'}
      
      Respond in this format:
      [Emoji] [Main Answer]
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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://yoit-solution.vercel.app',
          'X-Title': 'YoIt Education Assistant'
        }
      }
    );

    const aiResponse = response.data.choices?.[0]?.message?.content || 
      `${ETHIOPIAN_THEME.error} No response received from AI.`;

    return {
      text: formatResponse(aiResponse),
      quickReplies: generateQuickReplies(question, subject, university),
      imagePrompt: shouldGenerateImage(question) ? generateImagePrompt(question) : undefined
    };

  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    return {
      text: `${ETHIOPIAN_THEME.error} ${error.response?.data?.error?.message || 'AI request failed. Please try again.'}`,
      quickReplies: ["Try again", "Ask differently", "Contact support"]
    };
  }
}

async function handleAIMessage(text, chatId, telegram) {
  try {
    // Show typing indicator
    await telegram.sendChatAction(chatId, 'typing');
    
    // Add small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get AI response
    const { text: aiReply, quickReplies } = await askAI(text);
    
    // Prepare reply markup with quick replies and main menu option
    const replyMarkup = {
      reply_markup: {
        keyboard: [
          ...(quickReplies?.length ? [quickReplies.map(reply => ({ text: reply }))] : []),
          [{ text: '🔙 Main Menu' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }
    };

    // Send the message
    await telegram.sendMessage(chatId, aiReply, replyMarkup);
  } catch (error) {
    console.error('Error handling AI message:', error);
    await telegram.sendMessage(
      chatId,
      `${ETHIOPIAN_THEME.error} Sorry, I encountered an error. Please try again later.`,
      {
        reply_markup: {
          keyboard: [[{ text: 'Try Again' }, { text: 'Main Menu' }]],
          resize_keyboard: true
        }
      }
    );
  }
}

// Helper functions
function formatResponse(text) {
  return text
    .replace(/Physics/g, "ፊዚክስ")
    .replace(/Math/g, "ሒሳብ")
    .replace(/Chemistry/g, "ኬሚስትሪ")
    .replace(/Biology/g, "ባዮሎጂ")
    .replace(/Computer/g, "ኮምፒውተር")
    .replace(/Logic/g, "ሎጂክ")
    .replace(/Economics/g, "ኢኮኖሚክስ");
}

function generateQuickReplies(question, subject, university) {
  const baseReplies = [
    "Explain simpler",
    "Give examples",
    "Related topics"
  ];
  
  if (subject) {
    baseReplies.unshift(`More ${subject} help`);
  }
  
  if (question.includes("calculate") || question.includes("solve")) {
    baseReplies.push("Show steps");
  }
  
  if (question.includes("definition")) {
    baseReplies.push("Amharic translation");
  }
  
  return baseReplies.slice(0, 3); // Limit to 3 quick replies
}

function shouldGenerateImage(question) {
  const imageKeywords = ["diagram", "graph", "illustrate", "visual", "structure"];
  return imageKeywords.some(keyword => question.toLowerCase().includes(keyword));
}

function generateImagePrompt(question) {
  return `Educational diagram for Ethiopian university students: ${question}. 
          Use simple colors, include labels in English and Amharic, 
          make it culturally relevant.`;
}

// Export all functions at the bottom
export { askAI, handleAIMessage };