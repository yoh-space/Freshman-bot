"use client";
import React, { useRef, useState } from 'react';

export default function SimplePDFViewer({ url }) {
  const iframeRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');

  // PDF search is not natively supported in iframes, so we provide a fallback
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    // Try to use PDF.js find event if available (for browsers/extensions that support it)
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'find', query: searchTerm }, '*');
      } else {
        setSearchError('Search is not supported in this PDF viewer.');
      }
    } catch (err) {
      setSearchError('Search is not supported in this PDF viewer.');
    }
  };

  if (!url) {
    return <div style={{ color: 'orange', padding: 16 }}>No PDF URL provided.</div>;
  }
  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#f9f9f9', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto', padding: 16 }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search in PDF (experimental)"
          style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', minWidth: 180 }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, background: '#0077cc', color: '#fff', border: 'none', fontWeight: 600 }}>
          Search
        </button>
        {searchError && <span style={{ color: 'red', marginLeft: 8 }}>{searchError}</span>}
      </form>
      <iframe
        ref={iframeRef}
        src={url}
        width="100%"
        height="600px"
        style={{ border: 'none', borderRadius: 8, minHeight: '60vh', background: '#f9f9f9', display: 'block', margin: '0 auto', maxWidth: '100%' }}
        title="PDF Preview"
      />
      <div style={{ marginTop: 5, display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href={url} download style={{ color: '#0077cc', fontWeight: 600, textDecoration: 'none', border: '1px solid #0077cc', borderRadius: 2, padding: '3px 7px', background: '#f0f8ff' }}>Download PDF</a>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#0077cc', fontWeight: 300, textDecoration: 'none', border: '1px solid #0077cc', borderRadius: 6, padding: '3px 7px', background: '#f0f8ff' }}>Open in New Tab</a>
        <button onClick={() => { if (iframeRef.current) iframeRef.current.contentWindow.print(); }} style={{ color: '#0077cc', fontWeight: 600, border: '1px solid #0077cc', borderRadius: 6, padding: '3px 7px', background: '#f0f8ff', cursor: 'pointer' }}>Print</button>
      </div>
    </div>
  );
}
