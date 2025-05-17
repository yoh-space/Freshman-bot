"use client";
import { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Set worker path
pdfjs.GlobalWorkerOptions.workerPath = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function SimplePDFViewer({ url }) {
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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