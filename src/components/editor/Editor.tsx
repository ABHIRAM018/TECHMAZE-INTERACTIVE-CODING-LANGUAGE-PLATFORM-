import React, { useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditor } from '../../hooks/useEditor';
import { useParams } from 'react-router-dom';
import { getInitialCode } from '../../services/codeExecutionService';

const languageConfigs = {
  python: {
    language: 'python',
    theme: 'vs-dark'
  },
  c: {
    language: 'c',
    theme: 'vs-dark'
  },
  cpp: {
    language: 'cpp',
    theme: 'vs-dark'
  }
};

export function Editor() {
  const { language } = useParams<{ language: string }>();
  const { code, setCode } = useEditor();
  
  const config = languageConfigs[language as keyof typeof languageConfigs] || languageConfigs.python;

  useEffect(() => {
    // Initialize with example code if empty
    if (!code) {
      setCode(getInitialCode(language || 'python'));
    }
  }, [language, code, setCode]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleEditorMount = (editor: any) => {
    // Add keyboard shortcut for running code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // Trigger run code event
      const runButton = document.querySelector('[data-run-code]') as HTMLButtonElement;
      if (runButton) {
        runButton.click();
      }
    });
  };

  return (
    <MonacoEditor
      height="100%"
      language={config.language}
      theme={config.theme}
      value={code}
      onChange={handleEditorChange}
      onMount={handleEditorMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: language === 'python' ? 4 : 2,
        wordWrap: 'on',
        padding: { top: 16, bottom: 16 },
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        parameterHints: { enabled: true },
        formatOnType: true,
        formatOnPaste: true,
        bracketPairColorization: { enabled: true },
        guides: {
          bracketPairs: true,
          indentation: true
        }
      }}
    />
  );
}