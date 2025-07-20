import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '../components/editor/Editor';
import { Console } from '../components/editor/Console';
import { EditorProvider } from '../context/EditorContext';
import { Play, RotateCcw, Save, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useEditor } from '../hooks/useEditor';
import { executeCode, getInitialCode } from '../services/codeExecutionService';

function CodeEditorContent() {
  const { language = 'python' } = useParams<{ language: string }>();
  const { code, setCode, output, setOutput, error, setError } = useEditor();
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [hasRun, setHasRun] = useState(false);
  
  const handleRunCode = async () => {
    if (!code.trim()) {
      setError('Please write some code before running');
      setOutput('');
      return;
    }

    setIsRunning(true);
    setError('');
    setOutput('🚀 Compiling and executing your code...');
    setExecutionTime(null);
    
    try {
      const startTime = Date.now();
      const result = await executeCode(language, code);
      const endTime = Date.now();
      
      if (result.error) {
        setError(result.error);
        setOutput('');
      } else {
        setOutput(result.output || 'Code executed successfully (no output)');
        setExecutionTime(result.executionTime || (endTime - startTime));
        setHasRun(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setCode(getInitialCode(language));
    setOutput('');
    setError('');
    setExecutionTime(null);
    setHasRun(false);
  };

  const handleSaveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'cpp' ? 'cpp' : language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguageDisplayName = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python': return 'Python';
      case 'c': return 'C';
      case 'cpp': return 'C++';
      default: return lang.toUpperCase();
    }
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python': return 'from-blue-500 to-cyan-500';
      case 'c': return 'from-gray-500 to-slate-600';
      case 'cpp': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getLanguageColor(language)} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {getLanguageDisplayName(language)} Code Editor
              </h1>
              <p className="text-white/80">
                Write, compile, and execute {getLanguageDisplayName(language)} code in real-time
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {executionTime && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Clock className="h-4 w-4 text-white" />
                  <span className="text-white text-sm">⚡ {executionTime}ms</span>
                </div>
              )}
              
              {hasRun && !error && (
                <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  <span className="text-green-300 text-sm">Success</span>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-300" />
                  <span className="text-red-300 text-sm">Error</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Play className={`h-5 w-5 ${isRunning ? 'animate-pulse' : ''}`} />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
              
              <button
                onClick={handleResetCode}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={handleSaveCode}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
            
            <div className="text-gray-400 text-sm">
              Press Ctrl+Enter to run code
            </div>
          </div>
        </div>

        {/* Editor and Console */}
        <div className="grid grid-rows-2 gap-6 h-[calc(100vh-300px)]">
          {/* Code Editor */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-700">
              <h3 className="text-white font-semibold">Code Editor</h3>
            </div>
            <div className="h-full">
              <Editor />
            </div>
          </div>

          {/* Console Output */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-700">
              <h3 className="text-white font-semibold">Output Console</h3>
            </div>
            <div className="h-full">
              <Console />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CodeEditor() {
  return (
    <EditorProvider>
      <CodeEditorContent />
    </EditorProvider>
  );
}