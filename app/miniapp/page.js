"use client";
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';

function MiniAppContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const subject = searchParams.get('subject');

  // Map subject/type to file
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
  let file = subjectMap[subject];
  let folder = 'Modules';
  if (type === 'exam') folder = 'Exam';
  if (type === 'note') folder = 'Notes';
  if (type === 'worksheet') folder = 'WorkSheet';
  if (type === 'note' && subject === 'psychology') file = 'psy-notes.pdf';
  if (type === 'worksheet' && subject === 'math') file = 'math-worksheet.pdf';
  if (type === 'exam' && subject === 'physics') file = 'physics-mid-dilla-uv.pdf';

  const fileUrl = file ? `/` + folder + `/` + file : null;

  return (
    <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>Telegram Mini App</h1>
      {type && subject ? (
        fileUrl ? (
          <>
            <p>Here is your <b>{type}</b> for <b>{subject.replace(/-/g, ' ')}</b>:</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:'1.2em', color:'#0077cc'}}>Open PDF</a>
          </>
        ) : (
          <p style={{color:'red'}}>Sorry, your file isn't uploaded yet. Please check back later.</p>
        )
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
