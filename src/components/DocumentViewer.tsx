import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import { ContractIssue } from '../types/contract';

interface DocumentViewerProps {
  file: File | null;
  issues: ContractIssue[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ file, issues }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
              `<span class="redline" data-issue-type="${issue.type}" data-severity="${issue.severity}">$1</span>`
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
  }, [file, issues]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005776]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">No document loaded</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <style>
        {`
          .redline {
            position: relative;
            background-color: rgba(255, 0, 0, 0.1);
            border-bottom: 2px solid red;
            cursor: pointer;
          }

          .redline[data-severity="critical"] {
            background-color: rgba(220, 38, 38, 0.1);
            border-bottom-color: rgb(220, 38, 38);
          }

          .redline[data-severity="high"] {
            background-color: rgba(239, 68, 68, 0.1);
            border-bottom-color: rgb(239, 68, 68);
          }

          .redline[data-severity="medium"] {
            background-color: rgba(234, 179, 8, 0.1);
            border-bottom-color: rgb(234, 179, 8);
          }

          .redline[data-severity="low"] {
            background-color: rgba(59, 130, 246, 0.1);
            border-bottom-color: rgb(59, 130, 246);
          }

          .redline:hover::after {
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
        `}
      </style>
      <div 
        className="prose max-w-none h-full overflow-auto p-6"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default DocumentViewer; 