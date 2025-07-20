import React, { useState, useEffect } from 'react';
import {
  Code2,
  Users,
  BookOpen,
  Trophy,
  Cpu,
  Search,
  CheckCircle,
  Zap,
  Brain,
  Video,
  FileText,
  Terminal,
  Rocket,
  Star,
  Target,
  Play,
  ArrowRight,
  Globe,
  Award,
  TrendingUp,
  Coffee,
  Lightbulb,
  Shield,
  Clock,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const features = [
  {
    icon: Code2,
    title: 'Interactive Coding',
    description: 'Practice coding with real-time feedback and instant execution',
    color: 'from-cyan-500 to-blue-500',
    delay: 0
  },
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Get personalized recommendations and intelligent code analysis',
    color: 'from-purple-500 to-pink-500',
    delay: 0.1
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Learn from expert-led video courses and step-by-step guides',
    color: 'from-red-500 to-orange-500',
    delay: 0.2
  },
  {
    icon: Target,
    title: 'Structured Roadmaps',
    description: 'Follow carefully crafted learning paths from beginner to expert',
    color: 'from-green-500 to-emerald-500',
    delay: 0.3
  },
  {
    icon: Trophy,
    title: 'Challenge System',
    description: 'Test your skills with coding challenges and earn achievements',
    color: 'from-yellow-500 to-amber-500',
    delay: 0.4
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with fellow learners and get help from experts',
    color: 'from-indigo-500 to-purple-500',
    delay: 0.5
  }
];

const stats = [
  { label: 'Active Learners', value: '2.5M+', icon: Users, color: 'text-cyan-400' },
  { label: 'Code Challenges', value: '500+', icon: Code2, color: 'text-green-400' },
  { label: 'Video Tutorials', value: '1,200+', icon: Video, color: 'text-red-400' },
  { label: 'Success Rate', value: '94%', icon: Trophy, color: 'text-yellow-400' }
];

const languages = [
  {
    name: 'Python',
    icon: '🐍',
    description: 'Perfect for beginners, AI, and data science',
    popularity: 95,
    learners: '1.2M+',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'C',
    icon: '⚡',
    description: 'Master system programming and performance',
    popularity: 85,
    learners: '800K+',
    color: 'from-gray-500 to-slate-600'
  },
  {
    name: 'C++',
    icon: '🚀',
    description: 'Build games, desktop apps, and high-performance systems',
    popularity: 88,
    learners: '950K+',
    color: 'from-purple-500 to-pink-500'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    content: 'TECHMAZE helped me transition from a complete beginner to landing my dream job. The structured roadmaps and hands-on challenges were game-changers.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Full Stack Developer',
    content: 'The AI-powered learning recommendations kept me motivated and on track. I learned more in 6 months than I did in 2 years of self-study.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    rating: 5
  },
  {
    name: 'Emily Johnson',
    role: 'Data Scientist',
    content: 'The Python course was exceptional. From basics to advanced machine learning, everything was explained clearly with practical examples.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    rating: 5
  }
];

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      if (user) {
        navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate('/register');
      }
    }
  };

  const handleStartLearning = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/register');
    } else {
      navigate('/explore');
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-10 right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            {/* Logo Animation */}
            <div className={`flex items-center justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl shadow-cyan-500/25">
                  <Cpu className="h-12 w-12 text-white animate-pulse" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              </div>
            </div>

            {/* Main Heading */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-7xl md:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
                  TECHMAZE
                </span>
              </h1>
              <div className="text-3xl md:text-4xl font-bold text-white mb-4">
                Master Programming
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  Shape Your Future
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Join millions of developers on an interactive journey through Python, C, and C++. 
                From complete beginner to industry expert.
              </p>
            </div>

            {/* Search Bar */}
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-600 rounded-full p-2 flex items-center">
                    <Search className="ml-4 h-6 w-6 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What do you want to learn today?"
                      className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none text-lg"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-semibold"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <button
                  onClick={handleStartLearning}
                  className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    <span>Start Learning Free</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="group px-10 py-4 bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur-xl text-white rounded-xl font-bold text-lg transition-all duration-300 border border-slate-600 hover:border-slate-500 flex items-center justify-center gap-3"
                >
                  <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                onClick={() => scrollToSection('stats')}
                className="animate-bounce text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ChevronDown className="h-8 w-8 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="relative z-10 py-20 bg-slate-800/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Millions</h2>
            <p className="text-xl text-gray-300">Join the largest programming community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group animate-[fadeIn_0.6s_ease-out] opacity-0"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
              >
                <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 transform hover:scale-105">
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Choose Your Path</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master the most in-demand programming languages with our comprehensive courses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {languages.map((lang, index) => (
              <div
                key={lang.name}
                className="group bg-slate-800/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-500 transform hover:scale-105 animate-[fadeIn_0.6s_ease-out] opacity-0"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
              >
                <div className={`relative h-48 bg-gradient-to-br ${lang.color} p-8 flex items-center justify-center`}>
                  <div className="text-6xl mb-4">{lang.icon}</div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{lang.name}</h3>
                  <p className="text-gray-300 mb-6">{lang.description}</p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{lang.popularity}%</span>
                    </div>
                    <div className="text-gray-400">{lang.learners} learners</div>
                  </div>
                  <Link
                    to="/explore"
                    className={`w-full bg-gradient-to-r ${lang.color} text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group-hover:shadow-lg`}
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 py-20 bg-slate-800/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose TECHMAZE?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the most advanced and engaging way to learn programming
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-500 transform hover:scale-105 animate-[fadeIn_0.6s_ease-out] opacity-0"
                style={{ animationDelay: `${feature.delay}s`, animationFillMode: 'forwards' }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Success Stories</h2>
            <p className="text-xl text-gray-300">Hear from developers who transformed their careers</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <div className="text-center">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-cyan-500"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="text-white font-semibold text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-cyan-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-cyan-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join millions of developers who chose TECHMAZE to master programming. 
            Start your free journey today and unlock your potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={handleStartLearning}
              className="group px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25"
            >
              <div className="flex items-center justify-center gap-3">
                <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                <span>Start Learning Now</span>
              </div>
            </button>
            <Link
              to="/explore"
              className="group px-12 py-4 bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur-xl text-white rounded-xl font-bold text-xl transition-all duration-300 border border-slate-600 hover:border-slate-500 flex items-center justify-center gap-3"
            >
              <Globe className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Explore Courses</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="h-8 w-8 text-cyan-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  TECHMAZE
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering the next generation of developers with interactive learning, 
                expert guidance, and real-world projects.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                  <Github className="h-5 w-5 text-gray-300" />
                </a>
                <a href="#" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                  <Twitter className="h-5 w-5 text-gray-300" />
                </a>
                <a href="#" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                  <Linkedin className="h-5 w-5 text-gray-300" />
                </a>
                <a href="#" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                  <Mail className="h-5 w-5 text-gray-300" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Learn</h3>
              <ul className="space-y-2">
                <li><Link to="/explore" className="text-gray-300 hover:text-cyan-400 transition-colors">Python</Link></li>
                <li><Link to="/explore" className="text-gray-300 hover:text-cyan-400 transition-colors">C Programming</Link></li>
                <li><Link to="/explore" className="text-gray-300 hover:text-cyan-400 transition-colors">C++</Link></li>
                <li><Link to="/enhancement" className="text-gray-300 hover:text-cyan-400 transition-colors">Challenges</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 TECHMAZE. All rights reserved. Built with ❤️ for developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}