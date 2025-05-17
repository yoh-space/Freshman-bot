"use client";
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const AIChatBot = dynamic(() => import('../components/AIChatBot'), { 
  ssr: false,
  loading: () => <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '0.9em',
    color: '#555'
  }}>Loading AI Chat...</div>
});

const SimplePDFViewer = dynamic(() => import('./SimplePDFViewer'), { 
  ssr: false,
  loading: () => <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '60vh',
    fontSize: '0.9em',
    color: '#555'
  }}>Loading PDF...</div>
});

function MiniAppContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const subject = searchParams.get('subject');
  const file = searchParams.get('file');
  const notfound = searchParams.get('notfound');
  const aiMode = searchParams.get('ai');

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
  const pdfUrl = effectiveFile ? `/` + effectiveFile : null;

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      textAlign: 'center', 
      padding: 5, 
      background: '#f8fafc' 
    }}>
      {notfound === '1' ? (
        <p style={{color: '#e53e3e', fontSize: '0.9em'}}>Sorry, your file isn't uploaded yet. Please check back later.</p>
      ) : aiMode === '1' ? (
        <div style={{
          width: '100%', 
          maxWidth: 480, 
          margin: '16px auto 0', 
          background: '#fff', 
          borderRadius: 8, 
          boxShadow: '0 1px 6px #0001', 
          padding: 12, 
          border: '1px solid #e2e8f0',
          minHeight: '60vh'
        }}>
          <AIChatBot />
        </div>
      ) : pdfUrl ? (
        <>
          <p style={{marginBottom: 5, fontSize: '0.5em', color: '#333'}}>
            Here is your <b style={{color: '#0066cc'}}>{type}</b> for <b style={{color: '#0066cc'}}>{subject && subject.replace(/-/g, ' ')}</b>:
          </p>
          <div style={{
            width: '100%', 
            maxWidth: 800, 
            background: '#fff', 
            borderRadius: 8, 
            boxShadow: '0 1px 6px #0001', 
            padding: 16,
            border: '1px solid #e2e8f0'
          }}>
            <SimplePDFViewer url={pdfUrl} />
          </div>
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              fontSize: '0.9em', 
              color: '#0077cc', 
              fontWeight: 600, 
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: 12
            }}
          >
            Open PDF ↗
          </a>
        </>
      ) : (
        <p style={{color: '#dd6b20', fontSize: '0.9em'}}>No file selected. Please select a subject from the Telegram bot menu.</p>
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