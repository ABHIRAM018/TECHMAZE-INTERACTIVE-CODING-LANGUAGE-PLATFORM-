import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ConnectSupabase() {
  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center space-x-3 text-amber-600 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Supabase Connection Required</h2>
        </div>
        <p className="text-gray-600 mb-4">
          To use this application, please connect it to Supabase:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
          <li>Click the "Connect to Supabase" button in the top right</li>
          <li>Follow the setup instructions</li>
          <li>Wait for the connection to be established</li>
        </ol>
        <p className="text-sm text-gray-500">
          This will set up authentication and database features automatically.
        </p>
      </div>
    </div>
  );
}