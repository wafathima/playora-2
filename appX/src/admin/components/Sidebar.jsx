import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package, ShoppingBag, 
  PlusCircle, LogOut, ShieldAlert
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { path: '/admin/orders', label: 'Orders', icon: <Package className="w-5 h-5" /> },
    { path: '/admin/products', label: 'Products', icon: <ShoppingBag className="w-5 h-5" /> },
    { path: '/admin/products/add', label: 'Add Product', icon: <PlusCircle className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to exit the secure admin panel?')) {
      const userToken = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      localStorage.clear();
      
      // Preserving user data if needed for your auth logic
      if (userToken) localStorage.setItem('token', userToken);
      if (userData) localStorage.setItem('user', userData);
      
      navigate('/');
    }
  };

  return (
    <div className="bg-[#161922] text-slate-300 w-full h-full flex flex-col justify-between border-r border-slate-800/50">
      <div>
        {/* Brand Header */}
        <div className="py-8 px-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl tracking-tighter leading-none">PLAYORA</span>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] mt-1">Console v1.0</span>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="px-6 mb-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Navigation</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="px-4 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-indigo-600/10 text-white border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]' 
                    : 'hover:bg-slate-800/50 hover:text-white border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'}`}>
                    {item.icon}
                  </span>
                  <span className="font-semibold text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Logout Button */}
      <div className="p-6 border-t border-slate-800/50">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full py-3 px-4 bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-xl transition-all duration-300 font-bold text-sm border border-transparent hover:border-red-500/20 group"
        >
          <LogOut className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;