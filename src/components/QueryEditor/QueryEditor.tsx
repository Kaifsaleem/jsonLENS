import React, { useState } from 'react';
import { FieldSelector } from '../FieldSelector/FieldSelector';
import './QueryEditor.css';

interface QueryEditorProps {
  onQueryExecute: (query: string, queryType: string) => void;
  jsonData: unknown;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ onQueryExecute, jsonData }) => {
  const [queryType, setQueryType] = useState('filter');

  const handleFieldSelect = (field: string, operator: string, value: string) => {
    // Handle the field path and build appropriate query
    const finalValue = typeof value === 'string' && !value.startsWith('"') ? 
      `"${value}"` : value;

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
        query = `data.${arrayPath}.filter(item => item.${fieldPath} ${operator} ${finalValue})`;
      }
    } else {
      // Handle regular fields
      if (['includes', 'startsWith', 'endsWith'].includes(operator)) {
        query = `data.${field}.${operator}(${finalValue})`;
      } else {
        query = `data.${field} ${operator} ${finalValue}`;
      }
    }

    onQueryExecute(query, queryType);
  };

  return (
    <div className="query-editor">
      <h3>Query Builder</h3>
      <div className="query-type-selector">
        <button
          className={`type-btn ${queryType === 'filter' ? 'active' : ''}`}
          onClick={() => setQueryType('filter')}
        >
          Filter
        </button>
        <button
          className={`type-btn ${queryType === 'map' ? 'active' : ''}`}
          onClick={() => setQueryType('map')}
        >
          Map
        </button>
      </div>
      <FieldSelector
        jsonData={jsonData}
        onFieldSelect={handleFieldSelect}
        queryType={queryType}
      />
    </div>
  );
};
