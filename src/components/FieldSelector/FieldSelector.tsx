import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import './FieldSelector.css';

interface FieldInfo {
  path: string;
  type: string;
  children?: { [key: string]: FieldInfo };
}

interface FieldSelectorProps {
  jsonData: unknown;
  onFieldSelect: (field: string, operator: string, value: string) => void;
  queryType: string;
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  jsonData,
  onFieldSelect,
  queryType
}) => {
  const [fields, setFields] = useState<FieldInfo | null>(null);
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<string>('===');
  const [fieldValue, setFieldValue] = useState<string>('');

  const analyzeJson = (data: unknown, currentPath = '', depth = 0, seen = new WeakSet()): FieldInfo => {
    // Prevent infinite recursion
    if (depth > 10) {
      return { path: currentPath, type: 'max-depth-reached' };
    }

    const type = Array.isArray(data) ? 'array' : typeof data;
    const info: FieldInfo = { path: currentPath, type };

    // Handle null early
    if (data === null) {
      return { path: currentPath, type: 'null' };
    }

    // Only process objects and arrays
    if (type === 'object' || type === 'array') {
      // Check for circular references
      if (typeof data === 'object' && data !== null) {
        if (seen.has(data)) {
          return { path: currentPath, type: 'circular-reference' };
        }
        seen.add(data);
      }

      info.children = {};

      if (type === 'object') {
        Object.entries(data as object).forEach(([key, value]) => {
          const newPath = currentPath ? `${currentPath}.${key}` : key;
          info.children![key] = analyzeJson(value, newPath, depth + 1, seen);
        });
      } else if (type === 'array' && (data as unknown[]).length > 0) {
        // For arrays, only analyze the first item
        const sampleItem = (data as unknown[])[0];
        info.children['[n]'] = analyzeJson(sampleItem, `${currentPath}[n]`, depth + 1, seen);
      }
    }

    return info;
  };

  useEffect(() => {
    if (jsonData) {
      try {
        const analyzedFields = analyzeJson(jsonData);
        setFields(analyzedFields);
      } catch (error) {
        console.error('Error analyzing JSON:', error);
        setFields(null);
      }
    }
  }, [jsonData]);

  const getOperatorsForType = (type: string): string[] => {
    switch (type) {
      case 'number':
        return ['===', '!==', '>', '<', '>=', '<='];
      case 'string':
        return ['===', '!==', 'includes', 'startsWith', 'endsWith'];
      case 'boolean':
        return ['===', '!=='];
      default:
        return ['===', '!=='];
    }
  };

  const renderFieldOptions = (fieldInfo: FieldInfo, indent = 0): ReactNode[] => {
    const options: ReactNode[] = [];
    
    if (fieldInfo.children) {
      Object.entries(fieldInfo.children).forEach(([key, info]) => {
        if (!['circular-reference', 'max-depth-reached'].includes(info.type)) {
          const style = { paddingLeft: `${indent * 20}px` };
          options.push(
            <option key={info.path} value={info.path} style={style}>
              {key} ({info.type})
            </option>
          );
          if (info.children) {
            options.push(...renderFieldOptions(info, indent + 1));
          }
        }
      });
    }
    
    return options;
  };

  const handleSubmit = () => {
    if (selectedField && selectedOperator && fieldValue) {
      onFieldSelect(selectedField, selectedOperator, fieldValue);
    }
  };

  if (!fields || queryType !== 'filter') {
    return null;
  }

  return (
    <div className="field-selector">
      <div className="field-select">
        <label>Select Field:</label>
        <select 
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="select-input"
        >
          <option value="">Choose a field...</option>
          {renderFieldOptions(fields)}
        </select>
      </div>

      {selectedField && (
        <>
          <div className="operator-select">
            <label>Select Operator:</label>
            <select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="select-input"
            >
              {getOperatorsForType(typeof selectedField).map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>

          <div className="value-input">
            <label>Enter Value:</label>
            <input
              type="text"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="text-input"
              placeholder="Enter value..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            className="submit-button"
            disabled={!selectedField || !selectedOperator || !fieldValue}
          >
            Add Condition
          </button>
        </>
      )}
    </div>
  );
};
