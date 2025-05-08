import React, { useState } from 'react';
import './JsonEditor.css';

interface JsonEditorProps {
  onJsonChange: (json: string) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ onJsonChange }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setJsonInput(value);
    try {
      if (value.trim()) {
        JSON.parse(value);
        setError(null);
        onJsonChange(value);
      }
    } catch {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="json-editor">
      <h3>JSON Input</h3>
      <textarea
        value={jsonInput}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Paste your JSON here..."
        className={`json-textarea ${error ? 'error' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
