import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Bell, Menu, X, ShieldCheck } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { admin } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#0f1117] text-slate-200 font-sans">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out border-r border-slate-800/50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar (Glassmorphism) */}
        <header className="bg-[#161922]/80 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden mr-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Secure Panel</span>
                </div>
              </div>

              <div className="flex items-center space-x-5">
                {/* Notifications */}
                <button className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#161922] animate-pulse"></span>
                </button>

                {/* Admin Profile */}
                <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-white leading-tight">
                      {admin?.name || 'Administrator'}
                    </p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">
                      Master Root
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/20">
                    {admin?.name?.charAt(0) || 'A'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0f1117] custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#161922] border-t border-slate-800/50 px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <p className="tracking-wide">
              © {new Date().getFullYear()} <span className="text-indigo-400 font-bold">PLAYORA</span> ARCHIVE. SYSTEM STATUS: NOMINAL.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-500 uppercase tracking-widest">System Live</span>
              </div>
              <span className="bg-slate-800 px-3 py-1 rounded-md text-slate-300">v1.0.4-stable</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f1117;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e222d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #312e81;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;