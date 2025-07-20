import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Map, Youtube, FileText, BookOpen } from 'lucide-react';
import { RoadmapModal } from './roadmap/RoadmapModal';
import { YouTubeModal } from './modals/YouTubeModal';
import { NotesModal } from './modals/NotesModal';

interface LanguageCardProps {
  language: string;
  description: string;
  imagePath: string;
}

export function LanguageCard({ language, description, imagePath }: LanguageCardProps) {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-slate-700 hover:border-cyan-500/30 hover:shadow-cyan-500/10">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imagePath}
            alt={`${language} Programming`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
          <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">{language}</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-6 h-20">{description}</p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={`/code/${language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()}`}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-md transition-all"
            >
              <Code className="h-4 w-4" />
              <span>Start Coding</span>
            </Link>
            <button
              onClick={() => setShowRoadmap(true)}
              className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Map className="h-4 w-4" />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => setShowYouTube(true)}
              className="inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Youtube className="h-4 w-4" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => setShowNotes(true)}
              className="inline-flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Notes</span>
            </button>
          </div>
        </div>
      </div>
      <RoadmapModal
        language={language}
        isOpen={showRoadmap}
        onClose={() => setShowRoadmap(false)}
      />
      <YouTubeModal
        language={language}
        isOpen={showYouTube}
        onClose={() => setShowYouTube(false)}
      />
      <NotesModal
        language={language}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
      />
    </>
  );
}