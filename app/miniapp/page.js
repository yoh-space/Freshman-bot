"use client";
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the AIChatBot component with no SSR
const AIChatBot = dynamic(() => import('../components/AIChatBot'), { 
  ssr: false,
  loading: () => <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>Loading AI Chat...</div>
});

function MiniAppContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const subject = searchParams.get('subject');
  const file = searchParams.get('file');
  const notfound = searchParams.get('notfound');
  const aiMode = searchParams.get('ai');

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

//   if (aiMode === '1') {
//     return (
//       <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#f7fafd' }}>
//         <div style={{ width: '100%', maxWidth: 480, margin: '32px auto 0', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 16, display: 'flex', flexDirection: 'column', height: '80vh' }}>
//           <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12 }}>
//             {messages.map((msg, i) => (
//               <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', margin: '8px 0' }}>
//                 <span style={{
//                   display: 'inline-block',
//                   background: msg.from === 'user' ? '#d1e7ff' : '#e9fbe5',
//                   color: '#222',
//                   borderRadius: 16,
//                   padding: '8px 14px',
//                   maxWidth: '80%',
//                   fontSize: '1.05em',
//                   boxShadow: msg.from === 'user' ? '1px 1px 6px #b3d8ff44' : '1px 1px 6px #b3ffb344'
//                 }}>{msg.text}</span>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//           <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
//             <input
//               type="text"
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               placeholder="Type your question..."
//               style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc', fontSize: '1em' }}
//               disabled={loading}
//               autoFocus
//             />
//             <button type="submit" disabled={loading || !input.trim()} style={{ padding: '0 18px', borderRadius: 8, background: '#0077cc', color: '#fff', border: 'none', fontWeight: 600, fontSize: '1em' }}>{loading ? '...' : 'Send'}</button>
//           </form>
//           <button onClick={handleBackToMenu} style={{ marginTop: 16, background: '#eee', border: 'none', borderRadius: 8, padding: '8px 0', fontWeight: 500, color: '#0077cc', cursor: 'pointer' }}>🔙 Back to Menu</button>
//         </div>
//       </main>
//     );
//   }

  let effectiveFile = file;
  let effectiveType = type;
  let effectiveSubject = subject;
  if (!effectiveFile && effectiveType && effectiveSubject) {
    const subjectMap = {
      math: 'mathematics1.pdf',
      'maths-applied': 'MathApplied.pdf',
      'maths-social': 'mathsocial.pdf',
      'english-i': 'english1.pdf',
      'english-ii': 'english2.pdf',
      chemistry: 'chemistry.pdf',
      biology: 'biology.pdf',
      'organic-chemistry': 'emerging.pdf',
      anthropology: 'anthropology.pdf',
      inclusiveness: 'inclusiveness.pdf',
      'emerging-technology': 'emerging.pdf',
      history: 'history.pdf',
      cpp: 'c++.pdf',
      civics: 'civics.pdf',
      logic: 'logic.pdf',
      geography: 'geography.pdf',
      globaltrend: 'globaltrend.pdf',
      enterpreneurship: 'enterpreneurship.pdf',
      economics: 'economics.pdf',
      physics: 'physics.pdf',
      psychology: 'psy-notes.pdf',
      'math-worksheet': 'math-worksheet.pdf',
    };
    let folder = 'Modules';
    if (effectiveType === 'exam') folder = 'Exam';
    if (effectiveType === 'note') folder = 'Notes';
    if (effectiveType === 'worksheet') folder = 'WorkSheet';
    if (effectiveType === 'note' && effectiveSubject === 'psychology') effectiveFile = 'psy-notes.pdf';
    else if (effectiveType === 'worksheet' && effectiveSubject === 'math') effectiveFile = 'math-worksheet.pdf';
    else if (effectiveType === 'exam' && effectiveSubject === 'physics') effectiveFile = 'physics-mid-dilla-uv.pdf';
    else effectiveFile = subjectMap[effectiveSubject];
    if (effectiveFile) effectiveFile = `${folder}/${effectiveFile}`;
  }
  // Always try to load the PDF directly from the public folder
  const pdfUrl = effectiveFile ? `/` + effectiveFile : null;

  return (
    <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      {notfound === '1' ? (
        <p style={{color:'red'}}>Sorry, your file isn't uploaded yet. Please check back later.</p>
      ) : pdfUrl ? (
        <>
          <p>Here is your <b>{type}</b> for <b>{subject && subject.replace(/-/g, ' ')}</b>:</p>
          <iframe src={pdfUrl} width="100%" height="600px" style={{border:'1px solid #ccc', borderRadius:'8px', minHeight:'60vh', background:'#f9f9f9'}} title="PDF Preview" />
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:'1.2em', color:'#0077cc', marginTop:16}}>Open PDF in new tab</a>
        </>
      ) : (
        <p style={{color:'orange'}}>No file selected. Please select a subject from the Telegram bot menu.</p>
      )}
    </main>
  );
}

export default function MiniAppPage() {
  return (
    <Suspense>
      <MiniAppContent />
    </Suspense>
  );
}
