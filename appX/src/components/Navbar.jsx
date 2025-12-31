// import { useContext, useState, useRef, useEffect } from "react";
// import { Link, useNavigate,useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { ShoppingCart, Heart, User, LogOut, Package, Settings, ChevronDown, Menu } from "lucide-react";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [profileDropdown, setProfileDropdown] = useState(false);
//   const dropdownRef = useRef(null);


//   const isAdminRoute = location.pathname.startsWith('/admin');
//   if (isAdminRoute) return null;

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//     setProfileDropdown(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setProfileDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
//       <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
//         {/* Logo Section */}
//         <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95">
//           <img
//             src="playora.png"
//             alt="logo"
//             className="w-auto h-10 lg:h-12 object-contain"
//           />
//         </Link>

//         {/* Center Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-10">
//           <Link 
//             to="/" 
//             className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-sm tracking-wide"
//           >
//             Home
//           </Link>
//           <Link 
//             to="/products" 
//             className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-sm tracking-wide"
//           >
//             Collections
//           </Link>
//           {user?.isAdmin && (
//             <Link
//               to="/admin/add-product"
//               className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-100 transition-all"
//             >
//               ADMIN PANEL
//             </Link>
//           )}
//         </div>

//         {/* Right Side Icons/Auth */}
//         <div className="flex items-center gap-2 lg:gap-5">
          
//           <div className="hidden sm:flex items-center gap-2">
//             <Link 
//               to="/wishlist" 
//               className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300"
//               aria-label="Wishlist"
//             >
//               <Heart className="w-[22px] h-[22px]" />
//             </Link>

//             <Link 
//               to="/cart" 
//               className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300"
//               aria-label="Cart"
//             >
//               <ShoppingCart className="w-[22px] h-[22px]" />
//             </Link>
//           </div>

//           <div className="h-6 w-px bg-slate-200 hidden sm:block mx-2" />

//           <div className="relative" ref={dropdownRef}>
//             {user ? (
//               <>
//                 <button
//                   onClick={() => setProfileDropdown(!profileDropdown)}
//                   className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all duration-300"
//                 >
//                   <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
//                     {user.avatar ? (
//                       <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600">
//                         <User className="w-4 h-4" />
//                       </div>
//                     )}
//                   </div>
//                   <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${profileDropdown ? 'rotate-180' : ''}`} />
//                 </button>

//                 {profileDropdown && (
//                   <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 py-3 z-50 overflow-hidden">
//                     <div className="px-5 py-4 mb-2 bg-slate-50/50 border-b border-slate-50">
//                       <p className="font-bold text-slate-900 truncate">{user.name}</p>
//                       <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
//                     </div>

//                     <div className="px-2 space-y-1">
//                       <Link
//                         to="/profile"
//                         onClick={() => setProfileDropdown(false)}
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
//                       >
//                         <User className="w-4 h-4" />
//                         <span>My Profile</span>
//                       </Link>

//                       <Link
//                         to="/orders"
//                         onClick={() => setProfileDropdown(false)}
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
//                       >
//                         <Package className="w-4 h-4" />
//                         <span>Order History</span>
//                       </Link>

//                       {user?.isAdmin && (
//                         <Link
//                           to="/admin/add-product"
//                           onClick={() => setProfileDropdown(false)}
//                           className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
//                         >
//                           <Settings className="w-4 h-4" />
//                           <span>Admin Dashboard</span>
//                         </Link>
//                       )}
//                     </div>

//                     <div className="mt-3 px-2 pt-2 border-t border-slate-50">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
//                       >
//                         <LogOut className="w-4 h-4" />
//                         <span>Sign Out</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <Link
//                   to="/login"
//                   className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-indigo-600 px-4 py-2 transition-all"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-indigo-700 transition-all duration-300 font-bold text-sm shadow-lg shadow-slate-200"
//                 >
//                   Join Now
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Bottom Navigation (Refined) */}
//       <div className="md:hidden border-t border-slate-100 bg-white/90 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
//           <Link to="/products" className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-all">
//             <ShoppingCart className="w-5 h-5" />
//             <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Shop</span>
//           </Link>
//           <Link to="/categories" className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-all">
//             <Menu className="w-5 h-5" />
//             <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Catalog</span>
//           </Link>
//           <Link to="/wishlist" className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-all">
//             <Heart className="w-5 h-5" />
//             <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Saved</span>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart, Heart, User, LogOut, Package, Settings, ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Helper functions for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(' ');
    let initials = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };

  const getAvatarColor = (name) => {
    if (!name) return "bg-indigo-500";
    const colors = [
      "bg-indigo-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-violet-500"
    ];
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charSum % colors.length;
    return colors[colorIndex];
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user ? getInitials(user.name) : "U";
  const avatarColor = user ? getAvatarColor(user.name) : "bg-indigo-500";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95">
          <img
            src="playora.png"
            alt="logo"
            className="w-auto h-10 lg:h-12 object-contain"
          />
        </Link>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            to="/" 
            className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-sm tracking-wide"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-sm tracking-wide"
          >
            Collections
          </Link>
          {user?.isAdmin && (
            <Link
              to="/admin/add-product"
              className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-100 transition-all"
            >
              ADMIN PANEL
            </Link>
          )}
        </div>

        {/* Right Side Icons/Auth */}
        <div className="flex items-center gap-2 lg:gap-5">
          
          <div className="hidden sm:flex items-center gap-2">
            <Link 
              to="/wishlist" 
              className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300"
              aria-label="Wishlist"
            >
              <Heart className="w-[22px] h-[22px]" />
            </Link>

            <Link 
              to="/cart" 
              className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300"
              aria-label="Cart"
            >
              <ShoppingCart className="w-[22px] h-[22px]" />
            </Link>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block mx-2" />

          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-inner ${avatarColor} flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">
                      {initials}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${profileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 py-3 z-50 overflow-hidden">
                    <div className="px-5 py-4 mb-2 bg-slate-50/50 border-b border-slate-50">
                      <p className="font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="px-2 space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setProfileDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      >
                        <Package className="w-4 h-4" />
                        <span>Order History</span>
                      </Link>

                      {user?.isAdmin && (
                        <Link
                          to="/admin/add-product"
                          onClick={() => setProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                    </div>

                    <div className="mt-3 px-2 pt-2 border-t border-slate-50">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-indigo-600 px-4 py-2 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-indigo-700 transition-all duration-300 font-bold text-sm shadow-lg shadow-slate-200"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (Refined) */}
      <div className="md:hidden border-t border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <Link to="/products" className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-all">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Shop</span>
          </Link>
          <Link to="/categories" className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-all">
            <Menu className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Catalog</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-all">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Saved</span>
          </Link>
        </div>
      </div>
    </header>
  );
}