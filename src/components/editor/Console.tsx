import React from 'react';
import { useEditor } from '../../hooks/useEditor';
import { Terminal, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function Console() {
  const { output, error } = useEditor();
  
  const formatOutput = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index} className="mb-1">
        {line || '\u00A0'} {/* Non-breaking space for empty lines */}
      </div>
    ));
  };

  return (
    <div className="h-full bg-slate-900 text-white font-mono overflow-auto">
      <div className="p-4">
        {error ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <AlertCircle className="h-4 w-4" />
              <span className="font-semibold">Compilation Error</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <pre className="text-red-300 whitespace-pre-wrap text-sm">
                {error}
              </pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-400 mb-3">
              <CheckCircle className="h-4 w-4" />
              <span className="font-semibold">Output</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <pre className="text-green-300 whitespace-pre-wrap text-sm">
                {formatOutput(output)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Click "Run Code" to see output here</p>
              <p className="text-xs mt-1 opacity-75">Or press Ctrl+Enter in the editor</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}