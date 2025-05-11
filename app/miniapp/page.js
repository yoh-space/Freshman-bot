"use client";
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';

function MiniAppContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const subject = searchParams.get('subject');
  const file = searchParams.get('file');
  const notfound = searchParams.get('notfound');

  // If file param is present, use it directly for the PDF path
  const pdfUrl = file ? `/${file}` : (file ? file : null);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      {notfound === '1' ? (
        <p style={{color:'red'}}>Sorry, your file isn't uploaded yet. Please check back later.</p>
      ) : file ? (
        <>
          <p>Here is your <b>{type}</b> for <b>{subject && subject.replace(/-/g, ' ')}</b>:</p>
          <iframe src={pdfUrl} width="100%" height="600px" style={{border:'1px solid #ccc', borderRadius:'8px', minHeight:'60vh'}} title="PDF Preview" />
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:'1.2em', color:'#0077cc', marginTop:16}}>Open PDF in new tab</a>
        </>
      ) : (
        <p>Welcome! Please select a subject from the Telegram bot menu.</p>
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
