import React, { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the workerSrc property
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib ? pdfjsLib.version : '4.2.67'}/pdf.worker.min.js`;

export default function SimplePDFViewer({ url }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    let pdf = null;
    let isMounted = true;
    getDocument(url).promise.then((loadedPdf) => {
      pdf = loadedPdf;
      if (!isMounted) return;
      pdf.getPage(1).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: context, viewport });
      });
    });
    return () => {
      isMounted = false;
      if (pdf) pdf.destroy();
    };
  }, [url]);

  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#f9f9f9', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto' }}>
      <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
    </div>
  );
}
