import { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const { adminLogin } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await adminLogin(email, password);
    
    if (!result.success) {
      setError(result.error || "Invalid administrative credentials");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Branding/Logo Area */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 3 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/10"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            PLAYORA <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">CORE</span>
          </h2>
          <p className="mt-4 text-slate-500 text-xs font-bold uppercase tracking-[0.4em]">
            Access Restricted Area
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#161922]/80 backdrop-blur-xl border border-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-8 md:p-10">
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm font-semibold"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2 ml-1">
                Security Identity
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-[#0f1117] border border-slate-800 rounded-2xl text-white text-sm placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all outline-none"
                  placeholder="admin@playora.archive"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2 ml-1">
                Access Token
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-[#0f1117] border border-slate-800 rounded-2xl text-white text-sm placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center py-4 px-6 bg-indigo-600 text-white rounded-2xl text-sm font-black tracking-widest uppercase shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 hover:shadow-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Execute Authorization
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              </button>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-700 mb-6">
              <span className="bg-[#161922] px-4 relative z-10">Public Bypass</span>
              <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800" />
            </div>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 hover:text-indigo-400 transition-colors py-2 group"
            >
              Exit to Standard Interface
            </Link>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-slate-800" />
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
              RSA-4096 Encrypted Connection
            </p>
            <div className="h-px w-8 bg-slate-800" />
        </div>
      </motion.div>

      {/* Adding custom shimmer animation for the button */}
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}