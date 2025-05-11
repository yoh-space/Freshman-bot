import axios from 'axios';
import { getDocumentInfo } from './sendSubjectMenu';

const TELEGRAM_API = 'https://api.telegram.org/bot';
const BOT_TOKEN = process.env.BOT_TOKEN;

export async function sendDocument(chatId, type, subject) {
  // Find all matching PDFs for the subject and type
  const normalized = (str) => str.toLowerCase().replace(/[-_ ]/g, '');
  let matches = [];
  if (type === 'exam') {
    // Search Exam folder for subject
    if (subject) {
      matches = [
        ...['Exam'].map(folder =>
          [
            'ambo-university-physics-mid-exam.pdf',
            'geo-mid-bahirdar1.pdf',
            'logic-mid-jima.pdf',
            'physics-mid-dilla-uv.pdf',
            'physics-mid-wolkite_uv.pdf'
          ].filter(f => normalized(f).includes(normalized(subject))).map(f => ({ file: f, folder }))
        )
      ].flat();
    }
  } else if (type === 'note') {
    if (subject) {
      matches = [
        ...['Notes'].map(folder =>
          [
            'psy-notes.pdf'
          ].filter(f => normalized(f).includes(normalized(subject))).map(f => ({ file: f, folder }))
        )
      ].flat();
    }
  } else if (type === 'worksheet') {
    if (subject) {
      matches = [
        ...['WorkSheet'].map(folder =>
          [
            'math-worksheet.pdf'
          ].filter(f => normalized(f).includes(normalized(subject))).map(f => ({ file: f, folder }))
        )
      ].flat();
    }
  } else if (type === 'module') {
    // Use getDocumentInfo and also search Modules folder for partial matches
    const { file, folder } = getDocumentInfo(type, subject) || {};
    if (file && folder) {
      matches.push({ file, folder });
    }
    // Search all files in Modules for partial match
    const moduleFiles = [
      'mathematics1.pdf','MathApplied.pdf','mathsocial.pdf','english1.pdf','english2.pdf','chemistry.pdf','biology.pdf','emerging.pdf','anthropology.pdf','inclusiveness.pdf','history.pdf','c++.pdf','civics.pdf','logic.pdf','geography.pdf','globaltrend.pdf','enterpreneurship.pdf','economics.pdf','physics.pdf','psycho.pdf'
    ];
    matches.push(...moduleFiles.filter(f => normalized(f).includes(normalized(subject))).map(f => ({ file: f, folder: 'Modules' })));
  }
  // Remove duplicates
  matches = matches.filter((v,i,a) => a.findIndex(t => t.file === v.file && t.folder === v.folder) === i);
  if (!matches.length) {
    // If no document, open mini app with error message
    const miniAppUrl = `https://freshman-five.vercel.app/miniapp?type=${encodeURIComponent(type)}&subject=${encodeURIComponent(subject)}&notfound=1`;
    await axios.post(`${TELEGRAM_API}${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: 'The requested PDF will be uploaded soon. Please check back later.',
      reply_markup: { inline_keyboard: [[{ text: 'Open Mini App', web_app: { url: miniAppUrl } }], [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]] }
    });
    return;
  }
  // Use correct public URL for the document
  const baseUrl = process.env.VERCEL_URL?.replace(/\/$/, '').startsWith('http')
    ? process.env.VERCEL_URL.replace(/\/$/, '')
    : `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  for (const match of matches) {
    const miniAppUrl = `https://freshman-five.vercel.app/miniapp?type=${encodeURIComponent(type)}&subject=${encodeURIComponent(subject)}&file=${encodeURIComponent(match.folder + '/' + match.file)}`;
    await axios.post(`${TELEGRAM_API}${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: `Opening your ${type} for ${subject}...`,
      reply_markup: { inline_keyboard: [[{ text: 'Open in Mini App', web_app: { url: miniAppUrl } }], [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]] }
    });
  }
}
