import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';
import { CodeEditor } from './pages/CodeEditor';
import { Explore } from './pages/Explore';
import { Enhancement } from './pages/Enhancement';
import { AuthProvider } from './context/AuthContext';
import { EditorProvider } from './context/EditorContext';
import { ConnectSupabase } from './components/ConnectSupabase';
import { isSupabaseConfigured } from './lib/supabase';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';

export default function App() {
  if (!isSupabaseConfigured) {
    return <ConnectSupabase />;
  }

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/enhancement" element={<Enhancement />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/code/:language"
              element={
                <ProtectedRoute>
                  <EditorProvider>
                    <CodeEditor />
                  </EditorProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
