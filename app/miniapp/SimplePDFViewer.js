"use client";
import React, { useRef } from 'react';

export default function SimplePDFViewer({ url }) {
  const iframeRef = useRef(null);

  if (!url) {
    return <div style={{ color: 'orange', padding: 16 }}>No PDF URL provided.</div>;
  }
  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#f9f9f9', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto', padding: 0 }}>
      {/* Toolbar at the top */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px 6px 16px',
        background: '#f3f4f6',
        borderBottom: '1px solid #e2e8f0',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: 'sticky',
        top: 0,
        zIndex: 2
      }}>
        <a href={url} download title="Download PDF" style={{ color: '#0077cc', fontWeight: 600, textDecoration: 'none', border: '1px solid #0077cc', borderRadius: 6, padding: '6px 14px', background: '#f0f8ff', fontSize: 15 }}>⭳</a>
        <a href={url} target="_blank" rel="noopener noreferrer" title="Open in New Tab" style={{ color: '#0077cc', fontWeight: 600, textDecoration: 'none', border: '1px solid #0077cc', borderRadius: 6, padding: '6px 14px', background: '#f0f8ff', fontSize: 15 }}>↗</a>
        <button onClick={() => { if (iframeRef.current) iframeRef.current.contentWindow.print(); }} title="Print PDF" style={{ color: '#0077cc', fontWeight: 600, border: '1px solid #0077cc', borderRadius: 6, padding: '6px 14px', background: '#f0f8ff', cursor: 'pointer', fontSize: 15 }}>🖨️</button>
      </div>
      <iframe
        ref={iframeRef}
        src={url}
        width="100%"
        height="600px"
        style={{ border: 'none', borderRadius: '0 0 8px 8px', minHeight: '60vh', background: '#f9f9f9', display: 'block', margin: '0 auto', maxWidth: '100%' }}
        title="PDF Preview"
      />
    </div>
  );
}
