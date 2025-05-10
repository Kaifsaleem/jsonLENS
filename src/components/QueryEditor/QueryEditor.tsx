import React, { useState, useEffect } from 'react';
import { FieldSelector } from '../FieldSelector/FieldSelector';
import { JsEditor } from '../JsEditor/JsEditor';

interface QueryEditorProps {
  onQueryExecute: (query: string, queryType: string) => void;
  jsonData: unknown;
  onQueryTypeChange: (queryType: 'filter' | 'map') => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ onQueryExecute, jsonData, onQueryTypeChange }) => {
  const [queryType, setQueryType] = useState<'filter' | 'map'>('filter');

  useEffect(() => {
    onQueryTypeChange(queryType);
  }, [queryType, onQueryTypeChange]);

  const handleFieldSelect = (field: string, operator: string, value: string) => {
    // Determine if the value should be treated as a number
    const isNumber = !isNaN(Number(value)) && !isNaN(parseFloat(value));
    const isBoolean = value === 'true' || value === 'false';
  
    // Format the value based on type and operator
    let finalValue;
    if (isBoolean) {
      finalValue = value; // Keep boolean values as-is (true/false without quotes)
    } else if (isNumber && ['>', '<', '>=', '<=', '===', '!=='].includes(operator)) {
      finalValue = value; // Keep numeric values as is
    } else if (typeof value === 'string' && !value.startsWith('"')) {
      finalValue = `"${value}"`; // Wrap string values in quotes
    } else {
      finalValue = value;
    }

    let query: string;
    if (field.includes('[n]')) {
      // Handle array fields
      const pathParts = field.split('[n]');
      const arrayPath = pathParts[0];
      const fieldPath = pathParts[1].startsWith('.') ? 
        pathParts[1].substring(1) : pathParts[1];

      // Build query based on operator type
      if (['includes', 'startsWith', 'endsWith'].includes(operator)) {
        query = `data.${arrayPath}.filter(item => item.${fieldPath}.${operator}(${finalValue}))`;
      } else {
        // For numeric comparisons on array items
        if (isNumber && ['>', '<', '>=', '<='].includes(operator)) {
          query = `data.${arrayPath}.filter(item => item.${fieldPath} ${operator} ${finalValue})`;
        } else {
          query = `data.${arrayPath}.filter(item => item.${fieldPath} ${operator} ${finalValue})`;
        }
      }
    } else {
      // Handle regular fields
      if (['includes', 'startsWith', 'endsWith'].includes(operator)) {
        query = `data.${field}.${operator}(${finalValue})`;
      } else {
        // For numeric comparisons on regular fields
        if (isNumber && ['>', '<', '>=', '<='].includes(operator)) {
          query = `data.${field} ${operator} ${finalValue}`;
        } else {
          query = `data.${field} ${operator} ${finalValue}`;
        }
      }
    }

    onQueryExecute(query, queryType);
  };
  const handleCodeSubmit = (code: string, queryType: string) => {
    if (!jsonData) {
      alert('Please provide valid JSON data first');
      return;
    }
    onQueryExecute(code, queryType);
  };

  return (
    <div className="h-full bg-light-background dark:bg-dark-background overflow-hidden flex flex-col rounded border border-light-border dark:border-dark-border">
      <div className="flex space-x-4 p-3 border-b border-light-border dark:border-dark-border">
        <button
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            queryType === 'filter'
              ? 'bg-light-accent dark:bg-dark-accent text-light-background dark:text-dark-background'
              : 'bg-light-border dark:bg-dark-border text-light-primary dark:text-dark-primary hover:bg-light-accent/10 dark:hover:bg-dark-accent/10'
          }`}
          onClick={() => setQueryType('filter')}
        >
          Filter
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            queryType === 'map'
              ? 'bg-light-accent dark:bg-dark-accent text-light-background dark:text-dark-background'
              : 'bg-light-border dark:bg-dark-border text-light-primary dark:text-dark-primary hover:bg-light-accent/10 dark:hover:bg-dark-accent/10'
          }`}
          onClick={() => setQueryType('map')}
        >
          JsQuery
        </button>
      </div>


      <div className="flex-1 overflow-y-auto p-2">
        {queryType === 'filter' ? (
          <FieldSelector
            jsonData={jsonData}
            onFieldSelect={handleFieldSelect}
            queryType={queryType}
          />
        ) : (
          <div className='h-full'>
            <JsEditor onCodeSubmit={(code) => handleCodeSubmit(code, 'map')} />
          </div>
        )}
      </div>
      {/* <div className="flex-1 overflow-y-auto p-2">
        <FieldSelector
          jsonData={jsonData}
          onFieldSelect={handleFieldSelect}
          queryType={queryType}
        />
      </div> */}
    </div>
  );
};
