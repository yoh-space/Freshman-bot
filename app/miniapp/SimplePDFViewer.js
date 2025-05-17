"use client";
import { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Set worker path
pdfjs.GlobalWorkerOptions.workerPath = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function SimplePDFViewer({ url }) {
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
import React, { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the workerSrc property
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js`;

export default function SimplePDFViewer({ url }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const loadPdf = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjs.getDocument(url);
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
        setError(null);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [url]);

  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    const renderPage = async (pageNum) => {
      try {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({
          canvasContext: context,
          viewport
        }).promise;
      } catch (err) {
        console.error('Error rendering page:', err);
        setError('Failed to render PDF page. Please try again.');
      }
    };

    renderPage(1);
  }, [pdf]);

  if (loading) {
    return <div>Loading PDF...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
    let pdf = null;
    let isMounted = true;
    getDocument(url).promise.then((loadedPdf) => {
      pdf = loadedPdf;
      if (!isMounted) return;
      pdf.getPage(1).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return; // Prevent crash if canvas is not available
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
