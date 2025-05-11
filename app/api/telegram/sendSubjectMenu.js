import axios from 'axios';
const TELEGRAM_API = 'https://api.telegram.org/bot';
const BOT_TOKEN = process.env.BOT_TOKEN;

const SUBJECTS = [
  { name: 'Math', file: 'mathematics1.pdf', folder: 'Modules' },
  { name: 'Maths Applied', file: 'MathApplied.pdf', folder: 'Modules' },
  { name: 'Maths Social', file: 'mathsocial.pdf', folder: 'Modules' },
  { name: 'English I', file: 'english1.pdf', folder: 'Modules' },
  { name: 'English II', file: 'english2.pdf', folder: 'Modules' },
  { name: 'Chemistry', file: 'chemistry.pdf', folder: 'Modules' },
  { name: 'Biology', file: 'biology.pdf', folder: 'Modules' },
  { name: 'Organic Chemistry', file: 'emerging.pdf', folder: 'Modules' },
  { name: 'Anthropology', file: 'anthropology.pdf', folder: 'Modules' },
  { name: 'Inclusiveness', file: 'inclusiveness.pdf', folder: 'Modules' },
  { name: 'Emergining technology', file: 'emerging.pdf', folder: 'Modules' },
  { name: 'History', file: 'history.pdf', folder: 'Modules' },
  { name: 'C++', file: 'c++.pdf', folder: 'Modules' },
  { name: 'Civics', file: 'civics.pdf', folder: 'Modules' },
  { name: 'Logic', file: 'logic.pdf', folder: 'Modules' },
  { name: 'Geography', file: 'geography.pdf', folder: 'Modules' },
  { name: 'Global Trend', file: 'globaltrend.pdf', folder: 'Modules' },
  { name: 'Enterpreneurship', file: 'enterpreneurship.pdf', folder: 'Modules' },
  { name: 'Economics', file: 'economics.pdf', folder: 'Modules' },
  { name: 'Physics', file: 'physics-mid-dilla-uv.pdf', folder: 'Exam' },
  { name: 'Psychology', file: 'psy-notes.pdf', folder: 'Notes' },
  { name: 'Math Worksheet', file: 'math-worksheet.pdf', folder: 'WorkSheet' }
];

export async function sendSubjectMenu(chatId, resourceType) {
  let keyboard = [];
  if (resourceType === 'module') {
    keyboard = [
      [
        { text: 'Math', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=math' } },
        { text: 'Maths Applied', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=maths-applied' } },
        { text: 'Maths Social', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=maths-social' } }
      ],
      [
        { text: 'English I', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=english-i' } },
        { text: 'English II', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=english-ii' } },
        { text: 'Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=chemistry' } }
      ],
      [
        { text: 'Biology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=biology' } },
        { text: 'Organic Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=organic-chemistry' } },
        { text: 'Anthropology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=anthropology' } }
      ],
      [
        { text: 'Inclusiveness', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=inclusiveness' } },
        { text: 'Emergining technology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=emerging-technology' } },
        { text: 'History', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=history' } }
      ],
      [
        { text: 'C++', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=cpp' } },
        { text: 'Civics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=civics' } },
        { text: 'Logic', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=logic' } }
      ],
      [
        { text: 'Geography', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=geography' } },
        { text: 'Global Trend', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=globaltrend' } },
        { text: 'Enterpreneurship', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=enterpreneurship' } }
      ],
      [
        { text: 'Economics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=module&subject=economics' } }
      ],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  } else if (resourceType === 'exam') {
    keyboard = [
      [
        { text: 'Math', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=math' } },
        { text: 'Maths Applied', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=maths-applied' } },
        { text: 'Maths Social', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=maths-social' } }
      ],
      [
        { text: 'English I', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=english-i' } },
        { text: 'English II', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=english-ii' } },
        { text: 'Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=chemistry' } }
      ],
      [
        { text: 'Biology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=biology' } },
        { text: 'Organic Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=organic-chemistry' } },
        { text: 'Anthropology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=anthropology' } }
      ],
      [
        { text: 'Inclusiveness', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=inclusiveness' } },
        { text: 'Emergining technology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=emerging-technology' } },
        { text: 'History', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=history' } }
      ],
      [
        { text: 'C++', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=cpp' } },
        { text: 'Civics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=civics' } },
        { text: 'Logic', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=logic' } }
      ],
      [
        { text: 'Geography', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=geography' } },
        { text: 'Global Trend', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=globaltrend' } },
        { text: 'Enterpreneurship', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=enterpreneurship' } }
      ],
      [
        { text: 'Economics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=economics' } },
        { text: 'Physics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=exam&subject=physics' } }
      ],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  } else if (resourceType === 'note') {
    keyboard = [
      [
        { text: 'Math', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=math' } },
        { text: 'Maths Applied', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=maths-applied' } },
        { text: 'Maths Social', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=maths-social' } }
      ],
      [
        { text: 'English I', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=english-i' } },
        { text: 'English II', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=english-ii' } },
        { text: 'Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=chemistry' } }
      ],
      [
        { text: 'Biology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=biology' } },
        { text: 'Organic Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=organic-chemistry' } },
        { text: 'Anthropology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=anthropology' } }
      ],
      [
        { text: 'Inclusiveness', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=inclusiveness' } },
        { text: 'Emergining technology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=emerging-technology' } },
        { text: 'History', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=history' } }
      ],
      [
        { text: 'C++', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=cpp' } },
        { text: 'Civics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=civics' } },
        { text: 'Logic', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=logic' } }
      ],
      [
        { text: 'Geography', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=geography' } },
        { text: 'Global Trend', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=globaltrend' } },
        { text: 'Enterpreneurship', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=enterpreneurship' } }
      ],
      [
        { text: 'Economics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=economics' } },
        { text: 'Psychology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=note&subject=psychology' } }
      ],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  } else if (resourceType === 'worksheet') {
    keyboard = [
      [
        { text: 'Math', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=math' } },
        { text: 'Maths Applied', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=maths-applied' } },
        { text: 'Maths Social', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=maths-social' } }
      ],
      [
        { text: 'English I', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=english-i' } },
        { text: 'English II', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=english-ii' } },
        { text: 'Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=chemistry' } }
      ],
      [
        { text: 'Biology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=biology' } },
        { text: 'Organic Chemistry', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=organic-chemistry' } },
        { text: 'Anthropology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=anthropology' } }
      ],
      [
        { text: 'Inclusiveness', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=inclusiveness' } },
        { text: 'Emergining technology', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=emerging-technology' } },
        { text: 'History', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=history' } }
      ],
      [
        { text: 'C++', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=cpp' } },
        { text: 'Civics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=civics' } },
        { text: 'Logic', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=logic' } }
      ],
      [
        { text: 'Geography', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=geography' } },
        { text: 'Global Trend', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=globaltrend' } },
        { text: 'Enterpreneurship', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=enterpreneurship' } }
      ],
      [
        { text: 'Economics', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=economics' } },
        { text: 'Math Worksheet', web_app: { url: 'https://freshman-five.vercel.app/miniapp?type=worksheet&subject=math' } }
      ],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  }
  await axios.post(`${TELEGRAM_API}${BOT_TOKEN}/sendMessage`, {
    chat_id: chatId,
    text: `Select a subject for ${resourceType}:`,
    reply_markup: { inline_keyboard: keyboard }
  });
}

export function getDocumentInfo(type, subject) {
  // Normalize subject for case and dash/underscore differences
  const normalized = (str) => str.toLowerCase().replace(/[-_ ]/g, '');
  // Find the subject in SUBJECTS array
  let found;
  if (['module','exam','note','worksheet'].includes(type)) {
    found = SUBJECTS.find(s => normalized(s.name) === normalized(subject));
    if (found) return { file: found.file, folder: found.folder };
  }
  // Fallback to explicit matches for legacy support
  if (type === 'module' && subject === 'math') return { file: 'mathematics1.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'maths-applied') return { file: 'MathApplied.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'maths-social') return { file: 'mathsocial.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'english-i') return { file: 'english1.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'english-ii') return { file: 'english2.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'chemistry') return { file: 'chemistry.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'biology') return { file: 'biology.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'organic-chemistry') return { file: 'emerging.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'anthropology') return { file: 'anthropology.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'inclusiveness') return { file: 'inclusiveness.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'emerging-technology') return { file: 'emerging.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'history') return { file: 'history.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'cpp') return { file: 'c++.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'civics') return { file: 'civics.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'logic') return { file: 'logic.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'geography') return { file: 'geography.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'globaltrend') return { file: 'globaltrend.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'enterpreneurship') return { file: 'enterpreneurship.pdf', folder: 'Modules' };
  if (type === 'module' && subject === 'economics') return { file: 'economics.pdf', folder: 'Modules' };
  if (type === 'exam' && subject === 'physics') return { file: 'physics-mid-dilla-uv.pdf', folder: 'Exam' };
  if (type === 'note' && subject === 'psychology') return { file: 'psy-notes.pdf', folder: 'Notes' };
  if (type === 'worksheet' && subject === 'math') return { file: 'math-worksheet.pdf', folder: 'WorkSheet' };
  // If not found, respond with a placeholder
  return { file: null, folder: null };
}
