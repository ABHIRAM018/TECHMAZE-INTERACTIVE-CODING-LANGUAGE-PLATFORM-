import React, { useState } from 'react';
import { LanguageCard } from '../components/LanguageCard';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Search, Filter, Grid, List, Star, TrendingUp, Code, BookOpen, Play } from 'lucide-react';

const languages = [
  {
    name: 'Python',
    description: 'Python is a high-level, interpreted programming language known for its simplicity and readability. Perfect for beginners and professionals alike.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    difficulty: 'Beginner Friendly',
    popularity: 95,
    projects: 1200,
    learners: '2.5M+',
    tags: ['Web Dev', 'Data Science', 'AI/ML', 'Automation'],
    color: 'from-blue-500 to-green-500'
  },
  {
    name: 'C',
    description: 'C is a powerful low-level programming language that gives you complete control over hardware. It\'s the foundation of modern computing.',
    image: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    difficulty: 'Intermediate',
    popularity: 85,
    projects: 800,
    learners: '1.8M+',
    tags: ['System Programming', 'Embedded', 'OS Development', 'Performance'],
    color: 'from-gray-600 to-blue-600'
  },
  {
    name: 'C++',
    description: 'C++ extends C with object-oriented features. It\'s widely used in game development, system programming, and high-performance applications.',
    image: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    difficulty: 'Advanced',
    popularity: 88,
    projects: 950,
    learners: '2.1M+',
    tags: ['Game Dev', 'Systems', 'High Performance', 'Desktop Apps'],
    color: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Go',
    description: 'Go is a modern, fast, and efficient programming language designed for building scalable systems, microservices, and cloud applications with excellent concurrency support.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    difficulty: 'Intermediate',
    popularity: 82,
    projects: 750,
    learners: '1.5M+',
    tags: ['Cloud Native', 'Microservices', 'Concurrency', 'Backend', 'DevOps'],
    color: 'from-cyan-500 to-teal-500'
  }
];

const stats = [
  { label: 'Active Learners', value: '7.6M+', icon: TrendingUp, color: 'text-cyan-400' },
  { label: 'Code Projects', value: '3,600+', icon: Code, color: 'text-green-400' },
  { label: 'Learning Hours', value: '150K+', icon: BookOpen, color: 'text-purple-400' },
  { label: 'Success Rate', value: '94%', icon: Star, color: 'text-yellow-400' }
];

export function Explore() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Section */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-8 animate-bounce">
                <Code className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-white mb-6 animate-[slideDown_0.8s_ease-out]">
                Start Your
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  Coding Journey
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-[slideUp_0.8s_ease-out]">
                Join millions of developers learning to code with our interactive platform. 
                Access comprehensive roadmaps, video tutorials, and hands-on coding environments.
              </p>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-slate-700 animate-[fadeIn_0.8s_ease-out] opacity-0"
                  style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fadeIn_1s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
              <Link
                to="/register"
                className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                <UserPlus className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                <span className="text-lg font-semibold">Create Free Account</span>
              </Link>
              <Link
                to="/login"
                className="group flex items-center justify-center space-x-3 bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur-xl text-white px-8 py-4 rounded-xl transition-all duration-300 border border-slate-600 hover:border-slate-500"
              >
                <LogIn className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                <span className="text-lg font-semibold">Sign In</span>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Learning</h3>
                <p className="text-gray-400">Learn by doing with hands-on coding exercises and real-time feedback</p>
              </div>
              <div className="text-center animate-[slideUp_0.8s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Video Tutorials</h3>
                <p className="text-gray-400">Watch expert-led video courses and follow along at your own pace</p>
              </div>
              <div className="text-center animate-[slideUp_0.8s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Structured Roadmaps</h3>
                <p className="text-gray-400">Follow carefully crafted learning paths from beginner to expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 animate-[slideDown_0.6s_ease-out]">
              Explore Programming
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Languages
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-[slideUp_0.6s_ease-out]">
              Choose your path and master the art of programming with our comprehensive learning platform
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-[fadeIn_0.8s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search languages or technologies..."
                    className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 backdrop-blur-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-slate-800/50 text-gray-400 hover:text-white border border-slate-600'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-slate-800/50 text-gray-400 hover:text-white border border-slate-600'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-slate-800/30 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 animate-[fadeIn_0.6s_ease-out] opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Languages Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLanguages.map((lang, index) => (
                <div
                  key={lang.name}
                  className="animate-[fadeIn_0.6s_ease-out] opacity-0"
                  style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
                >
                  <div className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl">
                    {/* Language Header */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={lang.image}
                        alt={`${lang.name} Programming`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${lang.color} opacity-60`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-6 right-6">
                        <h3 className="text-3xl font-bold text-white mb-2">{lang.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                            {lang.difficulty}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm">{lang.popularity}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Language Content */}
                    <div className="p-6">
                      <p className="text-gray-300 mb-4 line-clamp-3">{lang.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lang.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-slate-700/50 text-cyan-400 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                        <div>
                          <div className="text-xl font-bold text-white">{lang.projects}</div>
                          <div className="text-gray-400 text-sm">Projects</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-white">{lang.learners}</div>
                          <div className="text-gray-400 text-sm">Learners</div>
                        </div>
                      </div>

                      {/* Enhanced Language Card */}
                      <LanguageCard
                        language={lang.name}
                        description={lang.description}
                        imagePath={lang.image}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredLanguages.map((lang, index) => (
                <div
                  key={lang.name}
                  className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 animate-[fadeIn_0.6s_ease-out] opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={lang.image}
                        alt={`${lang.name} Programming`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{lang.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-slate-700/50 text-cyan-400 rounded-full text-sm">
                            {lang.difficulty}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm">{lang.popularity}%</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{lang.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lang.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-slate-700/50 text-cyan-400 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span>{lang.projects} Projects</span>
                        <span>{lang.learners} Learners</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredLanguages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No languages found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}