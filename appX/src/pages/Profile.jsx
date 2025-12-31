// import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import API from "../api/axios"; 
// import { 
//   User, Mail, MapPin, Phone, Calendar, 
//   Edit2, Save, X, Upload, Package,
//   Heart, ShoppingBag, ShieldCheck, Sparkles, ChevronRight
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function ProfilePage() {
//   const { user, updateProfile } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [orderCount, setOrderCount] = useState(0);
//   const [orderLoading, setOrderLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     bio: "",
//     avatar: ""
//   });

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         address: user.address || "",
//         bio: user.bio || "",
//         avatar: user.avatar || ""
//       });
//       fetchOrderCount();
//     }
//   }, [user, navigate]); 

//   const fetchOrderCount = async () => {
//     try {
//       setOrderLoading(true);
//       const response = await API.get('/user/orders/my');
//       if (response.data.success) {
//         const orders = response.data.orders || [];
//         setOrderCount(orders.length);
//       }
//     } catch (error) {
//       console.error('Error fetching order count:', error);
//       setOrderCount(0);
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: user.name || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       address: user.address || "",
//       bio: user.bio || "",
//       avatar: user.avatar || ""
//     });
//     setIsEditing(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateProfile({
//         name: formData.name,
//         phone: formData.phone,
//         address: formData.address,
//         bio: formData.bio,
//         avatar: formData.avatar
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 500 * 1024) {
//       alert("Image too large (max 500KB)");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData(prev => ({ ...prev, avatar: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-[#FBFCFE] pb-20">
//       {/* Decorative Background Header */}
//       <div className="h-48 w-full bg-slate-900 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FBFCFE] to-transparent"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
//         {/* Profile Header Card */}
//         <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 mb-8 border border-slate-50">
//           <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
//             {/* Avatar Section */}
//             <div className="relative group">
//               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-slate-50 ring-1 ring-slate-100">
//                 {formData.avatar ? (
//                   <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-indigo-50">
//                     <User className="w-16 h-16 text-indigo-200" />
//                   </div>
//                 )}
//               </div>
//               {isEditing && (
//                 <label className="absolute bottom-2 right-2 p-3 bg-indigo-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 hover:scale-110 transition-all">
//                   <Upload className="w-4 h-4" />
//                   <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
//                 </label>
//               )}
//             </div>

//             <div className="flex-1 text-center md:text-left">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-1">{user.name}</h1>
//                   <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2 italic">
//                     <Mail className="w-4 h-4" /> {user.email}
//                   </p>
//                 </div>
//                 <div className="flex gap-3 justify-center">
//                   {!isEditing ? (
//                     <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
//                       <Edit2 className="w-4 h-4" /> Edit Profile
//                     </button>
//                   ) : (
//                     <>
//                       <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50">
//                         <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save"}
//                       </button>
//                       <button onClick={handleCancel} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all">
//                         <X className="w-4 h-4" /> Cancel
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Info Column */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
//               <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
//                 <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
//                 Personal Details
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <DetailItem label="Full Name" value={formData.name} name="name" isEditing={isEditing} onChange={handleInputChange} icon={<User />} />
//                 <DetailItem label="Phone Number" value={formData.phone} name="phone" isEditing={isEditing} onChange={handleInputChange} icon={<Phone />} placeholder="Not provided" />
//                 <DetailItem label="Location / Address" value={formData.address} name="address" isEditing={isEditing} onChange={handleInputChange} icon={<MapPin />} placeholder="No address added yet" isTextArea />
//                 <DetailItem label="About You" value={formData.bio} name="bio" isEditing={isEditing} onChange={handleInputChange} icon={<Sparkles />} placeholder="Share a bit about yourself..." isTextArea />
//               </div>

//               <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-3 text-slate-400">
//                 <Calendar className="w-4 h-4" />
//                 <span className="text-xs font-bold uppercase tracking-widest">
//                   Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar Column */}
//           <div className="space-y-6">
//             {/* Account Overview Stats */}
//             <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
//               <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
//                 <ShoppingBag className="w-5 h-5 text-indigo-500" /> Activity
//               </h3>
//               <div className="space-y-4">
//                 <StatRow label="Orders Completed" value={orderLoading ? "..." : orderCount} />
//                 <StatRow label="Wishlist Items" value={user?.wishlist?.length || 0} />
//                 <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
//                   <span className="text-sm font-medium text-slate-500">Membership</span>
//                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tighter rounded-full">Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions List */}
//             <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 overflow-hidden">
//               <h3 className="px-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Quick Navigation</h3>
//               <div className="space-y-1">
//                 <NavButton onClick={() => navigate("/orders")} icon={<Package />} label="Track Orders" />
//                 <NavButton onClick={() => navigate("/wishlist")} icon={<Heart />} label="My Favorites" />
//               </div>
//             </div>

//             {/* Account Type Card */}
//             <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
//               <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
//               <div className="flex items-center gap-4 relative z-10">
//                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
//                   <ShieldCheck className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-white tracking-tight">Account Tier</h4>
//                   <p className="text-indigo-100 text-xs font-medium uppercase tracking-widest opacity-80">
//                     {user.isAdmin ? "Administrator" : "Premium Member"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Helper Components for Cleaner Code
// function DetailItem({ label, value, name, isEditing, onChange, icon, placeholder, isTextArea }) {
//   return (
//     <div className="space-y-2">
//       <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
//       {isEditing ? (
//         isTextArea ? (
//           <textarea name={name} value={value} onChange={onChange} rows="3" className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium" />
//         ) : (
//           <input name={name} value={value} onChange={onChange} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium" />
//         )
//       ) : (
//         <div className="flex items-start gap-3 px-4 py-4 bg-[#FBFCFE] border border-slate-50 rounded-2xl group hover:border-indigo-100 transition-colors">
//           <span className="text-slate-300 mt-0.5">{icon}</span>
//           <span className="text-slate-900 font-medium text-sm leading-relaxed">{value || placeholder}</span>
//         </div>
//       )}
//     </div>
//   );
// }

// function StatRow({ label, value }) {
//   return (
//     <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
//       <span className="text-sm font-semibold text-slate-600">{label}</span>
//       <span className="text-lg font-bold text-slate-900">{value}</span>
//     </div>
//   );
// }

// function NavButton({ onClick, icon, label }) {
//   return (
//     <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group text-slate-600 hover:text-indigo-600">
//       <div className="flex items-center gap-3 font-bold text-sm">
//         <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">{icon}</span>
//         {label}
//       </div>
//       <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
//     </button>
//   );
// }


import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios"; 
import { 
  User, Mail, MapPin, Phone, Calendar, 
  Edit2, Save, X, Package,
  Heart, ShoppingBag, ShieldCheck, Sparkles, ChevronRight
} from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [orderLoading, setOrderLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || ""
      });
      fetchOrderCount();
    }
  }, [user, navigate]); 

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    
    const names = name.split(' ');
    let initials = names[0].charAt(0).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    
    return initials;
  };

  // Function to generate avatar color based on name
  const getAvatarColor = (name) => {
    if (!name) return "bg-indigo-500";
    
    const colors = [
      "bg-indigo-500",    // Blue
      "bg-emerald-500",   // Green
      "bg-amber-500",     // Yellow/Orange
      "bg-rose-500",      // Pink/Red
      "bg-violet-500",    // Purple
      "bg-cyan-500",      // Cyan
      "bg-fuchsia-500",   // Fuchsia
      "bg-sky-500",       // Light Blue
      "bg-lime-500",      // Lime Green
      "bg-orange-500"     // Orange
    ];
    
    // Generate consistent color based on name
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charSum % colors.length;
    
    return colors[colorIndex];
  };

  const fetchOrderCount = async () => {
    try {
      setOrderLoading(true);
      const response = await API.get('/user/orders/my');
      if (response.data.success) {
        const orders = response.data.orders || [];
        setOrderCount(orders.length);
      }
    } catch (error) {
      console.error('Error fetching order count:', error);
      setOrderCount(0);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      bio: user.bio || ""
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio
        // avatar is removed
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const initials = getInitials(user.name);
  const avatarColor = getAvatarColor(user.name);

  return (
    <div className="min-h-screen bg-[#FBFCFE] pb-20">
      {/* Decorative Background Header */}
      <div className="h-48 w-full bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FBFCFE] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 mb-8 border border-slate-50">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            {/* Avatar Section - First Letter */}
            <div className="relative group">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-8 border-white shadow-2xl ${avatarColor} ring-1 ring-slate-100 flex items-center justify-center`}>
                <span className="text-white text-5xl md:text-6xl font-bold font-serif tracking-tighter">
                  {initials}
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-1">{user.name}</h1>
                  <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2 italic">
                    <Mail className="w-4 h-4" /> {user.email}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </button>
                  ) : (
                    <>
                      <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50">
                        <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save"}
                      </button>
                      <button onClick={handleCancel} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all">
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                Personal Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DetailItem 
                  label="Full Name" 
                  value={formData.name} 
                  name="name" 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<User />} 
                />
                <DetailItem 
                  label="Phone Number" 
                  value={formData.phone} 
                  name="phone" 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<Phone />} 
                  placeholder="Not provided" 
                />
                <DetailItem 
                  label="Location / Address" 
                  value={formData.address} 
                  name="address" 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<MapPin />} 
                  placeholder="No address added yet" 
                  isTextArea 
                />
                <DetailItem 
                  label="About You" 
                  value={formData.bio} 
                  name="bio" 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<Sparkles />} 
                  placeholder="Share a bit about yourself..." 
                  isTextArea 
                />
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-3 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Account Overview Stats */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-indigo-500" /> Activity
              </h3>
              <div className="space-y-4">
                <StatRow label="Orders Completed" value={orderLoading ? "..." : orderCount} />
                <StatRow label="Wishlist Items" value={user?.wishlist?.length || 0} />
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Membership</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tighter rounded-full">Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 overflow-hidden">
              <h3 className="px-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Quick Navigation</h3>
              <div className="space-y-1">
                <NavButton onClick={() => navigate("/orders")} icon={<Package />} label="Track Orders" />
                <NavButton onClick={() => navigate("/wishlist")} icon={<Heart />} label="My Favorites" />
              </div>
            </div>

            {/* Account Type Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight">Account Tier</h4>
                  <p className="text-indigo-100 text-xs font-medium uppercase tracking-widest opacity-80">
                    {user.isAdmin ? "Administrator" : "Premium Member"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for Cleaner Code
function DetailItem({ label, value, name, isEditing, onChange, icon, placeholder, isTextArea }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      {isEditing ? (
        isTextArea ? (
          <textarea 
            name={name} 
            value={value} 
            onChange={onChange} 
            rows="3" 
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium" 
            placeholder={placeholder}
          />
        ) : (
          <input 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium" 
            placeholder={placeholder}
          />
        )
      ) : (
        <div className="flex items-start gap-3 px-4 py-4 bg-[#FBFCFE] border border-slate-50 rounded-2xl group hover:border-indigo-100 transition-colors">
          <span className="text-slate-300 mt-0.5">{icon}</span>
          <span className="text-slate-900 font-medium text-sm leading-relaxed">{value || placeholder}</span>
        </div>
      )}
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <span className="text-lg font-bold text-slate-900">{value}</span>
    </div>
  );
}

function NavButton({ onClick, icon, label }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group text-slate-600 hover:text-indigo-600">
      <div className="flex items-center gap-3 font-bold text-sm">
        <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">{icon}</span>
        {label}
      </div>
      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
    </button>
  );
}