"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function SimplePDFViewer({ url }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let pdfjsLib, getDocument, GlobalWorkerOptions;
    if (typeof window !== 'undefined') {
      pdfjsLib = require('pdfjs-dist/build/pdf');
      getDocument = pdfjsLib.getDocument;
      GlobalWorkerOptions = pdfjsLib.GlobalWorkerOptions;
      GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js';
    }
    if (!url || !getDocument) return;
    let pdf = null;
    let isMounted = true;
    getDocument(url).promise.then((loadedPdf) => {
      pdf = loadedPdf;
      if (!isMounted) return;
      pdf.getPage(1).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: context, viewport });
      }).catch((err) => {
        setError('Failed to load PDF page.');
      });
    }).catch((err) => {
      setError('Failed to load PDF document.');
    });
    return () => {
      isMounted = false;
      if (pdf) pdf.destroy();
    };
  }, [url]);

  if (error) {
    return <div style={{ color: 'red', padding: 16 }}>{error}</div>;
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#f9f9f9', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto' }}>
      <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
    </div>
  );
}
