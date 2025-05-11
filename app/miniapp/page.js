"use client";
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const SimplePDFViewer = dynamic(() => import('./SimplePDFViewer'), { ssr: false });

const MiniAppContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const subject = searchParams.get('subject');
  const file = searchParams.get('file');
  const notfound = searchParams.get('notfound');

  // Try to load the PDF directly from the public folder if the file exists
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
  
  const pdfUrl = effectiveFile ? `/${effectiveFile}` : null;

  return (
    <main className="mini-app-container">
      {notfound === '1' ? (
        <p className="error-message">Sorry, your file isn't uploaded yet. Please check back later.</p>
      ) : pdfUrl ? (
        <>
          <h1 className="document-title">
            {subject && subject.replace(/-/g, ' ').toUpperCase()} {type && type.toUpperCase()}
          </h1>
          <div className="pdf-viewer-wrapper">
            <SimplePDFViewer url={pdfUrl} />
          </div>
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="pdf-download-link"
          >
            Open PDF in new tab
          </a>
        </>
      ) : (
        <p className="warning-message">No file selected. Please select a subject from the Telegram bot menu.</p>
      )}
    </main>
  );
};

export default function MiniAppPage() {
  return (
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <MiniAppContent />
    </Suspense>
  );
};
