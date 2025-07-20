import React, { useState, useEffect } from 'react';
import { X, FileText, AlertCircle, ExternalLink, Search, BookOpen } from 'lucide-react';
import { fetchNotesResources, Resource } from '../../services/resourceService';

interface NotesModalProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotesModal({ language, isOpen, onClose }: NotesModalProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadResources();
    }
  }, [isOpen, language]);

  async function loadResources() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotesResources(language);
      setResources(data);
    } catch (err) {
      console.error('Error loading notes resources:', err);
      setError('Failed to load resources. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl w-full max-w-3xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-slate-700 bg-slate-900">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
            <BookOpen className="text-purple-500 h-6 w-6" />
            <span>{language} Learning Notes</span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </div>
        
        <div className="p-5">
          {/* Search bar */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="overflow-y-auto max-h-[60vh] pr-1 custom-scrollbar">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="text-center py-10">
                {searchQuery ? (
                  <div className="text-gray-400">
                    <p className="mb-2">No notes matching "{searchQuery}"</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <p>No learning notes available for {language} yet.</p>
                    <p className="mt-2 text-sm">Check back later or explore other languages.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredResources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="bg-purple-500 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-lg truncate group-hover:text-purple-300 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">{resource.url}</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-300 transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}