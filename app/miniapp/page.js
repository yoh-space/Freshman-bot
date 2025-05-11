"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function MiniAppContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const subject = searchParams.get('subject');
  const file = searchParams.get('file');
  const notfound = searchParams.get('notfound');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // If file param is not present, try to reconstruct it from type and subject
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
    if (effectiveFile) effectiveFile = `/${folder}/${effectiveFile}`;
  }
  const pdfUrl = effectiveFile || null;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      {notfound === '1' ? (
        <p style={{color:'red'}}>Sorry, your file isn't uploaded yet. Please check back later.</p>
      ) : pdfUrl ? (
        <>
          <p>Here is your <b>{type}</b> for <b>{subject && subject.replace(/-/g, ' ')}</b>:</p>
          <div style={{border:'1px solid #ccc', borderRadius:'8px', minHeight:'60vh', background:'#f9f9f9', padding:8, width:'100%', maxWidth:600}}>
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<span>Loading PDF...</span>}>
              <Page pageNumber={pageNumber} width={550} />
            </Document>
            {numPages && (
              <div style={{marginTop:8}}>
                <button onClick={() => setPageNumber(p => Math.max(1, p-1))} disabled={pageNumber <= 1}>Prev</button>
                <span style={{margin:'0 12px'}}>Page {pageNumber} of {numPages}</span>
                <button onClick={() => setPageNumber(p => Math.min(numPages, p+1))} disabled={pageNumber >= numPages}>Next</button>
              </div>
            )}
          </div>
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
