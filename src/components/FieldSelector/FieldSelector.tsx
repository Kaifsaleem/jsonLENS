import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
interface FieldInfo {
  path: string;
  type: string;
  children?: { [key: string]: FieldInfo };
  value?: unknown;
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
  const [selectedFieldType, setSelectedFieldType] = useState<string>('');

  const analyzeJson = (data: unknown, currentPath = '', depth = 0, seen = new WeakSet()): FieldInfo => {
    // Prevent infinite recursion
    if (depth > 10) {
      return { path: currentPath, type: 'max-depth-reached' };
    }

    // Handle null early
    if (data === null) {
      return { path: currentPath, type: 'null' };
    }

    // Determine the actual type and store the value
    let type = Array.isArray(data) ? 'array' : typeof data;
    
    // Detect numeric values, even if they're strings
    if (type === 'number' || (type === 'string' && !isNaN(Number(data)) && data !== '')) {
      type = 'number';
    }

    const info: FieldInfo = { 
      path: currentPath, 
      type,
      value: data 
    };

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
      } catch {
        setFields(null);
      }
    }
  }, [jsonData]);

  const getOperatorsForType = (type: string): string[] => {
    switch (type) {
      case 'number':
        return ['>', '<', '>=', '<=', '===', '!=='];
      case 'string':
        return ['===', '!==', 'includes', 'startsWith', 'endsWith'];
      case 'boolean':
        return ['===', '!=='];
      default:
        return ['===', '!=='];
    }
  };

  // const findFieldInfo = (path: string): FieldInfo | null => {
  //   console.log("path", path)
  //   console.log("fields",fields)
  //   if (!fields) return null;
  //   const parts = path.split('.');
  //   let current = fields;
  //   console.log(current)
  //   console.log(current.children)
  //   console.log(path)
  //   console.log(parts)
  //   for (const part of parts) {
  //     if (!current.children) return null;
  //     console.log(part)
  //     let key = part;
  //     if (key.includes('[n]')) {
  //       key = '[n]';
  //     }
  //     console.log(current.children[key])
  //     if (!current.children[key]) return null;
  //     current = current.children[key];
  //   }
  //   console.log("current",current)
  //   return current;
  // };
const findFieldInfo = (path: string, root: FieldInfo | null): FieldInfo | null => {
  if (!root || !path) return null;

  const pathSegments = path
    .replace(/\[n\]/g, '.[' + 'n' + ']') // normalize '[n]' usage (defensive)
    .split('.')
    .map(segment => segment === '[n]' ? '[n]' : segment); // keep '[n]' as is

  let current = root;

  for (const segment of pathSegments) {
    if (!current.children) return null;

    const key = segment === '[n]' ? '[n]' : segment;
    current = current.children[key];
    if (!current) return null;
  }

  console.log(current)
  return current;
};
  const handleFieldSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const path = event.target.value;
    setSelectedField(path);
    
    // Find and set the field type
    const fieldInfo = findFieldInfo(path, fields);
    if (fieldInfo) {
      const type = fieldInfo.type;
      console.log('Selected field type:', type); // Debug log
      setSelectedFieldType(type);
      console.log(type)
      
      // Reset operator and value when field changes
      const operators = getOperatorsForType(type);
      setSelectedOperator(operators[0]);
      setFieldValue('');
    }
  };

  const renderFieldOptions = (fieldInfo: FieldInfo, indent = 0): ReactNode[] => {
    const options: ReactNode[] = [];
    
    if (fieldInfo.children) {
      Object.entries(fieldInfo.children).forEach(([key, info]) => {
        // dont shoaw array and object types
        
       if (info.type === 'object' || info.type === 'array') {
        // Don't render the object/array itself, but still process its children
        if (info.children) {
          options.push(...renderFieldOptions(info, indent));
        }
      } 
      else if (!['circular-reference', 'max-depth-reached'].includes(info.type)) {
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
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-light-primary dark:text-dark-primary mb-1">
          Select Field:
        </label>
        <select 
          value={selectedField}
          onChange={handleFieldSelect}
          className="w-full px-3 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
        >
          <option value="">Choose a field...</option>
          {renderFieldOptions(fields)}
        </select>
      </div>

      {selectedField && (
        <div className="space-y-4 bg-light-border/10 dark:bg-dark-border/10 p-4 rounded-lg border border-light-border dark:border-dark-border">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-light-primary dark:text-dark-primary">
              Select Operator ({selectedFieldType} operations):
            </label>
            <select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            >
              {getOperatorsForType(selectedFieldType).map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-light-primary dark:text-dark-primary">
              Enter {selectedFieldType} Value:
            </label>
            <input
              type={selectedFieldType === 'number' ? 'number' : 'text'}
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
              placeholder={`Enter ${selectedFieldType} value...`}
            />
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-light-accent dark:bg-dark-accent hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 text-light-background dark:text-dark-background font-medium py-2 px-4 rounded-md transition-colors disabled:bg-light-border dark:disabled:bg-dark-border disabled:cursor-not-allowed"
            disabled={!selectedField || !selectedOperator || !fieldValue}
          >
            Add Condition
          </button>
        </div>
      )}
    </div>
  );
};
