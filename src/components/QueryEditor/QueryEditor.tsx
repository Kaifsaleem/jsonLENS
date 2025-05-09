import React, { useState } from 'react';
import { FieldSelector } from '../FieldSelector/FieldSelector';
interface QueryEditorProps {
  onQueryExecute: (query: string, queryType: string) => void;
  jsonData: unknown;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ onQueryExecute, jsonData }) => {
  const [queryType, setQueryType] = useState('filter');

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
    console.log(field)
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
      console.log("hello")
      if (['includes', 'startsWith', 'endsWith'].includes(operator)) {
           query = `data.${field}.${operator}(${finalValue})`
      } else {
        // For numeric comparisons on regular fields
        if (isNumber && ['>', '<', '>=', '<='].includes(operator)) {
                   query = `data.${field} ${operator} ${finalValue}`
        } else {
          query = `data.${field} ${operator} ${finalValue}`;
        }
      }
    }
    console.log(query)

    onQueryExecute(query, queryType);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 overflow-hidden flex flex-col">
      <div className="flex space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              queryType === 'filter'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setQueryType('filter')}
          >
            Filter
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              queryType === 'map'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setQueryType('map')}
          >
            Map
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FieldSelector
            jsonData={jsonData}
            onFieldSelect={handleFieldSelect}
            queryType={queryType}
          />
        </div>
    </div>
  );
};
