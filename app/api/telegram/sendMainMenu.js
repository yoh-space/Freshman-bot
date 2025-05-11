import axios from 'axios';
import Link from 'next/link';
const TELEGRAM_API = 'https://api.telegram.org/bot';
const BOT_TOKEN = process.env.BOT_TOKEN;

export async function sendMainMenu(chatId, message = null) {
  const text = message || `📚 *Welcome to Study Assistant Bot!*  \nWhat would you like to access today?  \n(Choose an option below 👇)`;
  await axios.post(`${TELEGRAM_API}${BOT_TOKEN}/sendMessage`, {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📖 Modules', callback_data: 'menu_modules' },
          { text: '📝 Exams', callback_data: 'menu_exams' }
        ],
        [
          { text: '🗒️ Notes', callback_data: 'menu_notes' },
          { text: '✍️ Worksheets', callback_data: 'menu_worksheets' }
        ],
        [
          { text: '🤖 Ask AI', callback_data: 'menu_ai' },
          { text: '🧠 Quiz Me', callback_data: 'menu_quiz' }
        ],
        [
          { text: '🆘 Help', callback_data: 'menu_help' }
        ],
        [
          { text: '🗔 Open Mini App', web_app: { url: 'https://freshman-five.vercel.app/miniapp' } }
        ]
      ]
    }
  });
}

// Example: Add a button to open the mini app (for demo, you can later make this dynamic per subject)
// Place this in your main menu or subject menu rendering code:
// <Link href="/miniapp" target="_blank"><button>Open Mini App</button></Link>
