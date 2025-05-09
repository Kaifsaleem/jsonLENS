import React from 'react';
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
    <div className="h-full bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
      
      <div className="flex-1 overflow-hidden p-3">
        {error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        ) : (
          <pre className="w-full h-full p-4 font-mono text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
            {formatResult(result)}
          </pre>
        )}
      </div>
    </div>
  );
};
