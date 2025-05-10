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
        { text: 'Math', callback_data: 'module_math' },
        { text: 'Maths Applied', callback_data: 'module_maths-applied' },
        { text: 'Maths Social', callback_data: 'module_maths-social' }
      ],
      [
        { text: 'English I', callback_data: 'module_english-i' },
        { text: 'English II', callback_data: 'module_english-ii' },
        { text: 'Chemistry', callback_data: 'module_chemistry' }
      ],
      [
        { text: 'Biology', callback_data: 'module_biology' },
        { text: 'Organic Chemistry', callback_data: 'module_organic-chemistry' },
        { text: 'Anthropology', callback_data: 'module_anthropology' }
      ],
      [
        { text: 'Inclusiveness', callback_data: 'module_inclusiveness' },
        { text: 'Emergining technology', callback_data: 'module_emerging-technology' },
        { text: 'History', callback_data: 'module_history' }
      ],
      [
        { text: 'C++', callback_data: 'module_cpp' },
        { text: 'Civics', callback_data: 'module_civics' },
        { text: 'Logic', callback_data: 'module_logic' }
      ],
      [
        { text: 'Geography', callback_data: 'module_geography' },
        { text: 'Global Trend', callback_data: 'module_globaltrend' },
        { text: 'Enterpreneurship', callback_data: 'module_enterpreneurship' }
      ],
      [
        { text: 'Economics', callback_data: 'module_economics' }
      ],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  } else if (resourceType === 'exam') {
    keyboard = [
      [
        { text: 'Math', callback_data: 'exam_math' },
        { text: 'Maths Applied', callback_data: 'exam_maths-applied' },
        { text: 'Maths Social', callback_data: 'exam_maths-social' }
      ],
      [
        { text: 'English I', callback_data: 'exam_english-i' },
        { text: 'English II', callback_data: 'exam_english-ii' },
        { text: 'Chemistry', callback_data: 'exam_chemistry' }
      ],
      [
        { text: 'Biology', callback_data: 'exam_biology' },
        { text: 'Organic Chemistry', callback_data: 'exam_organic-chemistry' },
        { text: 'Anthropology', callback_data: 'exam_anthropology' }
      ],
      [
        { text: 'Inclusiveness', callback_data: 'exam_inclusiveness' },
        { text: 'Emergining technology', callback_data: 'exam_emerging-technology' },
        { text: 'History', callback_data: 'exam_history' }
      ],
      [
        { text: 'C++', callback_data: 'exam_cpp' },
        { text: 'Civics', callback_data: 'exam_civics' },
        { text: 'Logic', callback_data: 'exam_logic' }
      ],
      [
        { text: 'Geography', callback_data: 'exam_geography' },
        { text: 'Global Trend', callback_data: 'exam_globaltrend' },
        { text: 'Enterpreneurship', callback_data: 'exam_enterpreneurship' }
      ],
      [
        { text: 'Economics', callback_data: 'exam_economics' },
        { text: 'Physics', callback_data: 'exam_physics' }
      ],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  } else if (resourceType === 'note') {
    keyboard = [
      [
        { text: 'Math', callback_data: 'note_math' },
        { text: 'Maths Applied', callback_data: 'note_maths-applied' },
        { text: 'Maths Social', callback_data: 'note_maths-social' }
      ],
      [
        { text: 'English I', callback_data: 'note_english-i' },
        { text: 'English II', callback_data: 'note_english-ii' },
        { text: 'Chemistry', callback_data: 'note_chemistry' }
      ],
      [
        { text: 'Biology', callback_data: 'note_biology' },
        { text: 'Organic Chemistry', callback_data: 'note_organic-chemistry' },
        { text: 'Anthropology', callback_data: 'note_anthropology' }
      ],
      [
        { text: 'Inclusiveness', callback_data: 'note_inclusiveness' },
        { text: 'Emergining technology', callback_data: 'note_emerging-technology' },
        { text: 'History', callback_data: 'note_history' }
      ],
      [
        { text: 'C++', callback_data: 'note_cpp' },
        { text: 'Civics', callback_data: 'note_civics' },
        { text: 'Logic', callback_data: 'note_logic' }
      ],
      [
        { text: 'Geography', callback_data: 'note_geography' },
        { text: 'Global Trend', callback_data: 'note_globaltrend' },
        { text: 'Enterpreneurship', callback_data: 'note_enterpreneurship' }
      ],
      [
        { text: 'Economics', callback_data: 'note_economics' },
        { text: 'Psychology', callback_data: 'note_psychology' }
      ],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  } else if (resourceType === 'worksheet') {
    keyboard = [
      [
        { text: 'Math', callback_data: 'worksheet_math' },
        { text: 'Maths Applied', callback_data: 'worksheet_maths-applied' },
        { text: 'Maths Social', callback_data: 'worksheet_maths-social' }
      ],
      [
        { text: 'English I', callback_data: 'worksheet_english-i' },
        { text: 'English II', callback_data: 'worksheet_english-ii' },
        { text: 'Chemistry', callback_data: 'worksheet_chemistry' }
      ],
      [
        { text: 'Biology', callback_data: 'worksheet_biology' },
        { text: 'Organic Chemistry', callback_data: 'worksheet_organic-chemistry' },
        { text: 'Anthropology', callback_data: 'worksheet_anthropology' }
      ],
      [
        { text: 'Inclusiveness', callback_data: 'worksheet_inclusiveness' },
        { text: 'Emergining technology', callback_data: 'worksheet_emerging-technology' },
        { text: 'History', callback_data: 'worksheet_history' }
      ],
      [
        { text: 'C++', callback_data: 'worksheet_cpp' },
        { text: 'Civics', callback_data: 'worksheet_civics' },
        { text: 'Logic', callback_data: 'worksheet_logic' }
      ],
      [
        { text: 'Geography', callback_data: 'worksheet_geography' },
        { text: 'Global Trend', callback_data: 'worksheet_globaltrend' },
        { text: 'Enterpreneurship', callback_data: 'worksheet_enterpreneurship' }
      ],
      [
        { text: 'Economics', callback_data: 'worksheet_economics' },
        { text: 'Math Worksheet', callback_data: 'worksheet_math' }
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
