"use client";
import React, { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the workerSrc property correctly
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function SimplePDFViewer({ url }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    if (!url) return;
    
    let pdf = null;
    let isMounted = true;
    setLoading(true);
    setError(null);

    getDocument({
      url,
      cMapUrl: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
    }).promise.then((loadedPdf) => {
      if (!isMounted) return;
      pdf = loadedPdf;
      setNumPages(pdf.numPages);
      
      return pdf.getPage(pageNumber);
    }).then((page) => {
      if (!isMounted || !page) return;
      
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      page.render(renderContext).promise.then(() => {
        setLoading(false);
      });
    }).catch((err) => {
      if (isMounted) {
        setError(err.message);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      if (pdf) pdf.destroy();
    };
  }, [url, pageNumber, scale]);

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    setScale(scale + 0.25);
  };

  const zoomOut = () => {
    if (scale > 0.5) {
      setScale(scale - 0.25);
    }
  };

  if (error) {
    return (
      <div className="pdf-error">
        Error loading PDF: {error}
      </div>
    );
  }

  return (
    <div className="pdf-viewer-container">
      {loading && <div className="pdf-loading">Loading PDF...</div>}
      
      <div className="pdf-controls">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages || '--'}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber >= (numPages || 0)}>
          Next
        </button>
        <button onClick={zoomIn} disabled={scale >= 2.5}>
          Zoom In
        </button>
        <button onClick={zoomOut} disabled={scale <= 0.5}>
          Zoom Out
        </button>
      </div>
      
      <div className="pdf-canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

const styles = `
  .mini-app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background: #f5f7fa;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .document-title {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .pdf-viewer-wrapper {
    width: 100%;
    max-width: 800px;
    min-height: 500px;
    margin: 1rem auto;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .pdf-viewer-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .pdf-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: #2c3e50;
    color: white;
  }

  .pdf-controls button {
    padding: 0.5rem 1rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .pdf-controls button:hover {
    background: #2980b9;
  }

  .pdf-controls button:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }

  .pdf-controls span {
    font-weight: bold;
    min-width: 120px;
    text-align: center;
  }

  .pdf-canvas-container {
    width: 100%;
    overflow: auto;
    padding: 1rem;
    background: #ecf0f1;
    display: flex;
    justify-content: center;
  }

  .pdf-loading, .pdf-error {
    padding: 2rem;
    text-align: center;
    color: #7f8c8d;
  }

  .pdf-error {
    color: #e74c3c;
  }

  .pdf-download-link {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: #27ae60;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .pdf-download-link:hover {
    background: #219653;
  }

  .error-message {
    color: #e74c3c;
    font-size: 1.2rem;
    margin: 2rem;
  }

  .warning-message {
    color: #f39c12;
    font-size: 1.2rem;
    margin: 2rem;
  }

  .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.2rem;
    color: #7f8c8d;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);