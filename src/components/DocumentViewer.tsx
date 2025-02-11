import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import { ContractIssue, Redline } from '../types/contract';

interface DocumentViewerProps {
  file: File | null;
  issues: ContractIssue[];
  redlines: Redline[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ file, issues, redlines }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRedlines, setShowRedlines] = useState(true);

  useEffect(() => {
    const loadDocument = async () => {
      if (!file) return;

      setLoading(true);
      setError(null);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        let html = result.value;

        // Apply redlines based on issues
        issues.forEach(issue => {
          if (issue.location && issue.location.text) {
            const escapedText = issue.location.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedText})`, 'g');
            html = html.replace(
              regex,
              `<span class="issue-highlight" data-issue-type="${issue.type}" data-severity="${issue.severity}">$1</span>`
            );
          }
        });

        // Apply suggested changes
        redlines.forEach(redline => {
          if (redline.location && redline.location.text) {
            const escapedText = redline.location.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedText})`, 'g');
            html = html.replace(
              regex,
              `<span class="redline-change" data-original="${redline.original_text}" data-suggested="${redline.suggested_text}">
                ${showRedlines ? redline.suggested_text : redline.original_text}
              </span>`
            );
          }
        });

        setHtmlContent(html);
      } catch (err) {
        setError('Failed to load document. Please try again.');
        console.error('Document loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [file, issues, redlines, showRedlines]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 px-6 py-2 bg-gray-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-700">Document View</h2>
        <button
          onClick={() => setShowRedlines(prev => !prev)}
          className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
        >
          {showRedlines ? 'Show Original' : 'Show Changes'}
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center flex-grow">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005776]"></div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center flex-grow">
          <div className="text-red-600">{error}</div>
        </div>
      )}

      {!file && !loading && !error && (
        <div className="flex items-center justify-center flex-grow">
          <div className="text-gray-500">No document loaded</div>
        </div>
      )}

      {file && !loading && !error && (
        <div className="flex-grow overflow-auto">
          <style>
            {`
              .issue-highlight {
                position: relative;
                cursor: pointer;
              }

              .issue-highlight[data-severity="critical"] {
                background-color: rgba(220, 38, 38, 0.1);
                border-bottom: 2px solid rgb(220, 38, 38);
              }

              .issue-highlight[data-severity="high"] {
                background-color: rgba(239, 68, 68, 0.1);
                border-bottom: 2px solid rgb(239, 68, 68);
              }

              .issue-highlight[data-severity="medium"] {
                background-color: rgba(234, 179, 8, 0.1);
                border-bottom: 2px solid rgb(234, 179, 8);
              }

              .issue-highlight[data-severity="low"] {
                background-color: rgba(59, 130, 246, 0.1);
                border-bottom: 2px solid rgb(59, 130, 246);
              }

              .issue-highlight:hover::after {
                content: attr(data-issue-type);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                padding: 4px 8px;
                background-color: white;
                border: 1px solid #e2e8f0;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                z-index: 10;
              }

              .redline-change {
                position: relative;
                background-color: rgba(34, 197, 94, 0.1);
                border-bottom: 2px solid rgb(34, 197, 94);
                cursor: pointer;
              }

              .redline-change:hover::after {
                content: "Original: " attr(data-original) "\A Suggested: " attr(data-suggested);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                padding: 4px 8px;
                background-color: white;
                border: 1px solid #e2e8f0;
                border-radius: 4px;
                font-size: 12px;
                white-space: pre-wrap;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                z-index: 10;
                max-width: 300px;
              }
            `}
          </style>
          <div 
            className="prose max-w-none p-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentViewer; 