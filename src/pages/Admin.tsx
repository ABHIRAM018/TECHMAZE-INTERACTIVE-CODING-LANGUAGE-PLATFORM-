import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Youtube, FileText, AlertCircle, CheckCircle, ArrowLeft, Settings, Globe, Clock, Users, Edit3, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface Resource {
  id?: string;
  language: string;
  title: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

const LANGUAGES = ['Python', 'C', 'C++', 'Go'];

export function Admin() {
  const [youtubeResources, setYoutubeResources] = useState<Resource[]>([]);
  const [notesResources, setNotesResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab] = useState<'youtube' | 'notes'>('youtube');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading resources...');
      
      const [youtubeResponse, notesResponse] = await Promise.all([
        supabase
          .from('youtube_resources')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('notes_resources')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      console.log('YouTube response:', youtubeResponse);
      console.log('Notes response:', notesResponse);

      if (youtubeResponse.error) {
        console.error('YouTube resources error:', youtubeResponse.error);
        throw new Error(`YouTube resources: ${youtubeResponse.error.message}`);
      }
      if (notesResponse.error) {
        console.error('Notes resources error:', notesResponse.error);
        throw new Error(`Notes resources: ${notesResponse.error.message}`);
      }

      setYoutubeResources(youtubeResponse.data || []);
      setNotesResources(notesResponse.data || []);
      
      console.log('Resources loaded successfully');
    } catch (err) {
      console.error('Error loading resources:', err);
      setError(err instanceof Error ? err.message : 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    const resources = activeTab === 'youtube' ? youtubeResources : notesResources;
    const table = activeTab === 'youtube' ? 'youtube_resources' : 'notes_resources';

    console.log(`Saving ${resources.length} resources to ${table}`);

    try {
      // Validate all resources
      for (const resource of resources) {
        if (!resource.language || !resource.title || !resource.url) {
          throw new Error('Please fill in all fields (Language, Title, URL) for each resource');
        }
        
        // Validate URL format
        try {
          new URL(resource.url);
        } catch {
          throw new Error(`Invalid URL format: ${resource.url}`);
        }

        // Validate language
        if (!LANGUAGES.includes(resource.language)) {
          throw new Error(`Invalid language: ${resource.language}. Must be one of: ${LANGUAGES.join(', ')}`);
        }
      }

      // Process each resource individually
      for (const resource of resources) {
        const resourceData = {
          language: resource.language,
          title: resource.title.trim(),
          url: resource.url.trim(),
          updated_at: new Date().toISOString()
        };

        if (resource.id) {
          // Update existing resource
          console.log(`Updating resource ${resource.id}:`, resourceData);
          
          const { error: updateError } = await supabase
            .from(table)
            .update(resourceData)
            .eq('id', resource.id);

          if (updateError) {
            console.error('Update error:', updateError);
            throw new Error(`Failed to update "${resource.title}": ${updateError.message}`);
          }
        } else {
          // Insert new resource
          console.log('Inserting new resource:', resourceData);
          
          const { data: insertData, error: insertError } = await supabase
            .from(table)
            .insert([{
              ...resourceData,
              created_at: new Date().toISOString()
            }])
            .select();

          if (insertError) {
            console.error('Insert error:', insertError);
            throw new Error(`Failed to add "${resource.title}": ${insertError.message}`);
          }

          console.log('Insert successful:', insertData);
        }
      }
      
      // Reload resources to get updated data
      await loadResources();
      
      setSuccessMessage(`✅ ${activeTab === 'youtube' ? 'YouTube' : 'Notes'} resources saved successfully!`);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error saving resources:', error);
      setError(error instanceof Error ? error.message : 'Failed to save resources. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function addResource() {
    const newResource: Resource = {
      language: 'Go', // Default to Go since that's what we're adding
      title: '',
      url: ''
    };

    console.log('Adding new resource:', newResource);

    if (activeTab === 'youtube') {
      setYoutubeResources([...youtubeResources, newResource]);
    } else {
      setNotesResources([...notesResources, newResource]);
    }
  }

  async function removeResource(index: number) {
    const resources = activeTab === 'youtube' ? youtubeResources : notesResources;
    const resourceToRemove = resources[index];
    const table = activeTab === 'youtube' ? 'youtube_resources' : 'notes_resources';

    try {
      // If resource has an ID, delete from database
      if (resourceToRemove.id) {
        console.log(`Deleting resource ${resourceToRemove.id} from ${table}`);
        
        const { error: deleteError } = await supabase
          .from(table)
          .delete()
          .eq('id', resourceToRemove.id);

        if (deleteError) {
          console.error('Delete error:', deleteError);
          throw new Error(`Failed to delete "${resourceToRemove.title}": ${deleteError.message}`);
        }
      }

      // Remove from local state
      if (activeTab === 'youtube') {
        const newResources = [...youtubeResources];
        newResources.splice(index, 1);
        setYoutubeResources(newResources);
      } else {
        const newResources = [...notesResources];
        newResources.splice(index, 1);
        setNotesResources(newResources);
      }

      setSuccessMessage(`Resource "${resourceToRemove.title}" deleted successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (error) {
      console.error('Error removing resource:', error);
      setError(error instanceof Error ? error.message : 'Failed to remove resource');
    }
  }

  function updateResource(index: number, field: keyof Resource, value: string) {
    console.log(`Updating resource ${index}, field ${field}:`, value);
    
    if (activeTab === 'youtube') {
      const newResources = [...youtubeResources];
      newResources[index] = { ...newResources[index], [field]: value };
      setYoutubeResources(newResources);
    } else {
      const newResources = [...notesResources];
      newResources[index] = { ...newResources[index], [field]: value };
      setNotesResources(newResources);
    }
  }

  function validateUrl(url: string): boolean {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const resources = activeTab === 'youtube' ? youtubeResources : notesResources;
  const stats = [
    { label: 'YouTube Resources', value: youtubeResources.length, icon: Youtube, color: 'text-red-400' },
    { label: 'Notes Resources', value: notesResources.length, icon: FileText, color: 'text-purple-400' },
    { label: 'Total Languages', value: LANGUAGES.length, icon: Globe, color: 'text-cyan-400' },
    { label: 'Last Updated', value: 'Now', icon: Clock, color: 'text-green-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-6 animate-bounce">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Admin
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  Control Panel
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Manage learning resources, YouTube playlists, and programming notes for all languages including Go
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-slate-800/30 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Debug Info */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 backdrop-blur-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Error Details:</div>
                  <div className="text-sm">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4 flex items-start space-x-3 backdrop-blur-xl">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/50 backdrop-blur-xl p-2 rounded-xl border border-slate-700/50">
              <button
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'youtube'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Youtube className="h-5 w-5" />
                <span className="font-medium">YouTube Playlists ({youtubeResources.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'notes'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="font-medium">Programming Notes ({notesResources.length})</span>
              </button>
            </div>
          </div>

          {/* Resource Management */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50 bg-slate-900/50">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                  {activeTab === 'youtube' ? (
                    <>
                      <Youtube className="h-6 w-6 text-red-500" />
                      YouTube Playlists
                    </>
                  ) : (
                    <>
                      <FileText className="h-6 w-6 text-purple-500" />
                      Programming Notes
                    </>
                  )}
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
                  </button>
                  <button
                    onClick={addResource}
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add {activeTab === 'youtube' ? 'YouTube' : 'Notes'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  {resources.map((resource, index) => (
                    <div key={`${resource.id || 'new'}-${index}`} className="bg-slate-700/30 backdrop-blur-sm p-4 rounded-xl border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Language</label>
                          <select
                            value={resource.language}
                            onChange={(e) => updateResource(index, 'language', e.target.value)}
                            className="w-full rounded-lg bg-slate-800/50 border border-slate-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                          >
                            {LANGUAGES.map(lang => (
                              <option key={lang} value={lang}>{lang}</option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-4">
                          <label className="block text-xs text-gray-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={resource.title}
                            onChange={(e) => updateResource(index, 'title', e.target.value)}
                            placeholder={`${activeTab === 'youtube' ? 'YouTube Playlist' : 'Notes Document'} Title`}
                            className="w-full rounded-lg bg-slate-800/50 border border-slate-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                          />
                        </div>
                        <div className="md:col-span-5">
                          <label className="block text-xs text-gray-400 mb-1">URL</label>
                          <div className="relative">
                            <input
                              type="url"
                              value={resource.url}
                              onChange={(e) => updateResource(index, 'url', e.target.value)}
                              placeholder={activeTab === 'notes' ? 
                                "https://example.com/go-tutorial.pdf" : 
                                "https://youtube.com/playlist?list=..."
                              }
                              className={`w-full rounded-lg bg-slate-800/50 border text-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
                                resource.url && !validateUrl(resource.url) 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-slate-600'
                              }`}
                            />
                            {resource.url && validateUrl(resource.url) && (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-1 flex justify-center">
                          <button
                            onClick={() => removeResource(index)}
                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                            title="Delete Resource"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      {resource.id && (
                        <div className="mt-2 text-xs text-gray-500">
                          ID: {resource.id} | Created: {resource.created_at ? new Date(resource.created_at).toLocaleDateString() : 'New'}
                        </div>
                      )}
                    </div>
                  ))}

                  {resources.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        {activeTab === 'youtube' ? (
                          <Youtube className="w-8 h-8 text-gray-400" />
                        ) : (
                          <FileText className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Resources Yet</h3>
                      <p className="text-gray-400 mb-6">
                        No {activeTab === 'youtube' ? 'YouTube playlists' : 'programming notes'} added yet. Click "Add {activeTab === 'youtube' ? 'YouTube' : 'Notes'}" to get started.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}