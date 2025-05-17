"use client";
import React from 'react';

export default function SimplePDFViewer({ url }) {
  if (!url) {
    return <div style={{ color: 'orange', padding: 16 }}>No PDF URL provided.</div>;
  }
  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#f9f9f9', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto' }}>
      <iframe
        src={url}
        width="100%"
        height="600px"
        style={{ border: 'none', borderRadius: 8, minHeight: '60vh', background: '#f9f9f9', display: 'block', margin: '0 auto', maxWidth: '100%' }}
        title="PDF Preview"
      />
    </div>
  );
}
