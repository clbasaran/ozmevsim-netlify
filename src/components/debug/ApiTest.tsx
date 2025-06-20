'use client';

import React, { useState } from 'react';

export default function ApiTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testApi = async (endpoint: string) => {
    setIsLoading(true);
    setTestResult('');
    
    try {
      console.log(`🧪 Testing API endpoint: ${endpoint}`);
      const url = `${window.location.origin}${endpoint}`;
      console.log(`🧪 Full URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });
      
      console.log(`🧪 Response status: ${response.status}`);
      console.log(`🧪 Response headers:`, Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log(`🧪 Response data:`, data);
        setTestResult(JSON.stringify(data, null, 2));
      } else {
        const errorText = await response.text();
        console.error(`🧪 API Error: ${response.status} - ${errorText}`);
        setTestResult(`Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error(`🧪 Fetch error:`, error);
      setTestResult(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">API Test Debug Panel</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => testApi('/api/test')}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Test /api/test
          </button>
          
          <button
            onClick={() => testApi('/api/products')}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Test /api/products
          </button>
        </div>
        
        {isLoading && (
          <div className="text-blue-600">
            Testing API...
          </div>
        )}
        
        {testResult && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Result:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-96">
              {testResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 