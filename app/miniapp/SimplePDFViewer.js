"use client";
import React, { useRef } from 'react';

export default function SimplePDFViewer({ url }) {
  const iframeRef = useRef(null);

  if (!url) {
    return <div style={{ color: 'orange', padding: 16 }}>No PDF URL provided.</div>;
  }
  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#f9f9f9', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto', padding: 16 }}>
      <iframe
        ref={iframeRef}
        src={url}
        width="100%"
        height="600px"
        style={{ border: 'none', borderRadius: 8, minHeight: '60vh', background: '#f9f9f9', display: 'block', margin: '0 auto', maxWidth: '100%' }}
        title="PDF Preview"
      />
      <div style={{ marginTop: 12, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href={url} download style={{ color: '#0077cc', fontWeight: 600, textDecoration: 'none', border: '1px solid #0077cc', borderRadius: 6, padding: '6px 14px', background: '#f0f8ff' }}>Download PDF</a>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#0077cc', fontWeight: 600, textDecoration: 'none', border: '1px solid #0077cc', borderRadius: 6, padding: '6px 14px', background: '#f0f8ff' }}>Open in New Tab</a>
        <button onClick={() => { if (iframeRef.current) iframeRef.current.contentWindow.print(); }} style={{ color: '#0077cc', fontWeight: 600, border: '1px solid #0077cc', borderRadius: 6, padding: '6px 14px', background: '#f0f8ff', cursor: 'pointer' }}>Print</button>
      </div>
    </div>
  );
}
