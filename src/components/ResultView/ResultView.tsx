import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import {
  DocumentDuplicateIcon,
  // ClipboardIcon,
  ArrowPathIcon,
  ScissorsIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

interface ResultViewProps {
  result: unknown;
  error: string | null;
  onReset?: () => void;
  onCut?: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ 
  result, 
  error, 
  onReset, 
  onCut
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const formatResult = (data: unknown): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const handleCopy = () => {
    const text = formatResult(result);
    navigator.clipboard.writeText(text);
  };


  const handleReset = () => {
    onReset?.();
  };

  const handleCut = () => {
    const text = formatResult(result);
    navigator.clipboard.writeText(text);
    onCut?.();
  };

  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(Array.isArray(result) ? result : [result]);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Data');
  //   XLSX.writeFile(wb, 'export.xlsx');
  // };

  const exportToDoc = () => {
    const doc = new jsPDF();
    doc.text(formatResult(result), 10, 10);
    doc.save('export.pdf');
  };

  const exportToJson = () => {
    const blob = new Blob([formatResult(result)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-light-background dark:bg-dark-background overflow-hidden flex flex-col border border-light-border dark:border-dark-border rounded">
      <div className="flex items-center justify-between p-2 border-b border-light-border dark:border-dark-border">
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-light-secondary hover:text-light-primary dark:text-dark-secondary dark:hover:text-dark-primary rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
            title="Copy"
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-light-secondary hover:text-light-primary dark:text-dark-secondary dark:hover:text-dark-primary rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
            title="Reset"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleCut}
            className="p-2 text-light-secondary hover:text-light-primary dark:text-dark-secondary dark:hover:text-dark-primary rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
            title="Cut"
          >
            <ScissorsIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center space-x-1 px-3 py-2 bg-light-accent dark:bg-dark-accent text-light-background dark:text-dark-background rounded-lg hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:ring-offset-2"
          >
            <span>Export</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg shadow-lg py-1 z-10">
              {/* <button
                onClick={() => {
                  exportToExcel();
                  setShowExportMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-light-primary dark:text-dark-primary hover:bg-light-border dark:hover:bg-dark-border"
              >
                Export as Excel
              </button> */}
              <button
                onClick={() => {
                  exportToDoc();
                  setShowExportMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-light-primary dark:text-dark-primary hover:bg-light-border dark:hover:bg-dark-border"
              >
                Export as PDF
              </button>
              <button
                onClick={() => {
                  exportToJson();
                  setShowExportMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-light-primary dark:text-dark-primary hover:bg-light-border dark:hover:bg-dark-border"
              >
                Export as JSON
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3">
        {error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        ) : (
          <pre className="w-full h-full max-h-[700px] p-4 font-mono text-sm text-light-primary dark:text-dark-primary bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg overflow-auto">
            {formatResult(result)}
          </pre>
        )}
      </div>
    </div>
  );
};
