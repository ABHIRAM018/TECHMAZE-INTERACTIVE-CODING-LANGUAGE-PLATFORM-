import React from 'react';
import { X, Map } from 'lucide-react';
import { RoadmapContent } from './RoadmapContent';

interface RoadmapModalProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapModal({ language, isOpen, onClose }: RoadmapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl w-full max-w-4xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-slate-700 bg-slate-900">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
            <Map className="text-emerald-500 h-6 w-6" />
            <span>{language} Learning Roadmap</span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
          <RoadmapContent language={language} />
        </div>
      </div>
    </div>
  );
}