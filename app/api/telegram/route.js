import { sendMainMenu } from './sendMainMenu';
import { sendSubjectMenu } from './sendSubjectMenu';
import { sendDocument } from './sendDocument';
import { askAI, handleAIMessage } from './ai';
import axios from 'axios';

const TELEGRAM_API = 'https://api.telegram.org/bot';
const BOT_TOKEN = process.env.BOT_TOKEN;

// Helper function to send Telegram API requests
async function sendTelegramRequest(endpoint, payload) {
  try {
    const response = await axios.post(`${TELEGRAM_API}${BOT_TOKEN}/${endpoint}`, payload);
    return response.data;
  } catch (error) {
    console.error('Telegram API error:', error.response?.data || error.message);
    throw error;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, callback_query } = body;

    // Handle callback queries (button presses)
    if (callback_query) {
      const { message: callbackMessage, data, id: callbackId } = callback_query;
      const chatId = callbackMessage.chat.id;

      // Always answer callback query first
      await sendTelegramRequest('answerCallbackQuery', {
        callback_query_id: callbackId
      });

      // Handle different menu actions
      if (data === 'menu_ai') {
        await sendTelegramRequest('sendMessage', {
          chat_id: chatId,
          text: '💡 Type your academic question:',
          reply_markup: { 
            inline_keyboard: [[{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]] 
          }
        });
        return new Response(JSON.stringify({ ok: true }));
      }

      if (data.startsWith('menu_')) {
        switch(data) {
          case 'menu_modules':
            await sendSubjectMenu(chatId, 'module');
            break;
          case 'menu_exams':
            await sendSubjectMenu(chatId, 'exam');
            break;
          case 'menu_notes':
            await sendSubjectMenu(chatId, 'note');
            break;
          case 'menu_worksheets':
            await sendSubjectMenu(chatId, 'worksheet');
            break;
          case 'main_menu':
            await sendMainMenu(chatId);
            break;
          default:
            await sendMainMenu(chatId, '⚠️ Unknown action. Returning to main menu:');
        }
      } 
      // Handle document requests (e.g., module_math, exam_physics)
      else if (data.includes('_')) {
        const [type, subject] = data.split('_');
        await sendDocument(chatId, type, subject);
      }

      return new Response(JSON.stringify({ ok: true }));
    }

    // Handle regular messages
    if (message?.text) {
      const chatId = message.chat.id;
      const text = message.text.trim();

      // Handle AI questions
      if (text && !text.startsWith('/')) {
        await handleAIMessage(text, chatId, {
          sendMessage: (chatId, text, options) => 
            sendTelegramRequest('sendMessage', { chat_id: chatId, text, ...options }),
          sendChatAction: (chatId, action) =>
            sendTelegramRequest('sendChatAction', { chat_id: chatId, action })
        });
        return new Response(JSON.stringify({ ok: true }));
      }

      // Handle commands
      const textLower = text.toLowerCase();
      if (textLower.includes('/start') || textLower.includes('hello')) {
        await sendMainMenu(chatId);
      } else {
        await sendMainMenu(chatId, "I didn't understand that. Here's the main menu:");
      }
    }

    return new Response(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error('Error handling Telegram update:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error processing request',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }), 
      { status: 500 }
    );
  }
}

export function GET() {
  return new Response(
    JSON.stringify({ 
      error: 'Method not allowed',
      message: 'Please use POST requests for Telegram webhook'
    }), 
    { status: 405 }
  );
}