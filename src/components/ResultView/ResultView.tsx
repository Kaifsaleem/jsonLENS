import React from 'react';
import './ResultView.css';

interface ResultViewProps {
  result: unknown;
  error: string | null;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, error }) => {
  const formatResult = (data: unknown): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div className="result-view">
      <h3>Result</h3>
      <div className={`result-content ${error ? 'error' : ''}`}>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <pre>{formatResult(result)}</pre>
        )}
      </div>
    </div>
  );
};
