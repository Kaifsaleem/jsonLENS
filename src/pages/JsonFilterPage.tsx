import { useState } from 'react';
import { JsonEditor } from '../components/JsonEditor/JsonEditor';
import { QueryEditor } from '../components/QueryEditor/QueryEditor';
import { ResultView } from '../components/ResultView/ResultView';
export function JsonFilterPage() {
  const [jsonData, setJsonData] = useState<unknown>(null);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      setJsonData(parsed);
      setError(null);
    } catch {
      setError('Invalid JSON format');
    }
  };

  const handleFilterQuery = (query: string) => { 
      try {
      // First line of query must reference 'data'
      if (!query.trim().startsWith('data.')) {
        throw new Error('Query must start with "data." to access the JSON');
      }

      // Convert string to executable function
      // Example: If query is "data.items.filter(item => item.price < 3)"
      // This creates a function like:
      // function(data) {
      //   return data.items.filter(item => item.price < 3);
      // }
      const functionBody = `
        return ${query};
      `;
      
      // Create the function
      const filterFn = new Function('data', functionBody);

        // Call the function with your JSON data
      const filtered = filterFn(jsonData);
      setResult(filtered);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query execution failed');
      setResult(null);
    }

  }

  const handleQueryExecute = (query: string, queryType:string) => {
    if (!jsonData) {
      setError('Please provide valid JSON data first');
      return;
    }
    if (queryType === 'filter') {
      // console.log(queryType);
      // console.log(query);
      handleFilterQuery(query);
    }
    else if (queryType === 'map') {
      // Handle map query here
      // For now, just set the result to the original data
      setResult(jsonData);
    }
  
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <div className="w-1/2 flex flex-col">
        <div className="h-1/2">
          <JsonEditor onJsonChange={handleJsonChange} />
        </div>
        <div className="h-1/2">
          <QueryEditor onQueryExecute={handleQueryExecute} jsonData={jsonData} />
        </div>
      </div>
      <div className="w-1/2">
        <ResultView result={result} error={error} />
      </div>
    </div>
  );
}
