import React, { createContext, useState } from 'react';

interface EditorContextType {
  code: string;
  setCode: (code: string) => void;
  output: string;
  setOutput: (output: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  return (
    <EditorContext.Provider value={{
      code,
      setCode,
      output,
      setOutput,
      error,
      setError
    }}>
      {children}
    </EditorContext.Provider>
  );
}