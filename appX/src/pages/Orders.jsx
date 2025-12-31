// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { 
//   Calendar, 
//   Package, 
//   CreditCard, 
//   Truck, 
//   CheckCircle, 
//   Clock,
//   XCircle,
//   ChevronRight,
//   ShoppingBag,
//   Filter,
//   ArrowRight,
//   Hash
// } from "lucide-react";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const res = await API.get("/user/orders/my");
//         setOrders(res.data.orders);
//         setFilteredOrders(res.data.orders);
//       } catch (err) {
//         setError("Failed to load orders. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     if (statusFilter === "all") {
//       setFilteredOrders(orders);
//     } else {
//       const filtered = orders.filter(order => 
//        ( order.orderStatus || "PROCESSING").toUpperCase() === statusFilter.toUpperCase()
//       );
//       setFilteredOrders(filtered);
//     }
//   }, [statusFilter, orders]);

//   const getStatusDetails = (status) => {
//     const statusLower = status.toLowerCase();
//     const configs = {
//       "delivered": { icon: CheckCircle, badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-100", iconClass: "text-emerald-500", text: "Delivered" },
//       "pending": { icon: Clock, badgeClass: "bg-amber-50 text-amber-700 border-amber-100", iconClass: "text-amber-500", text: "Pending" },
//       "processing": { icon: Package, badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-100", iconClass: "text-indigo-500", text: "Processing" },
//       "shipped": { icon: Truck, badgeClass: "bg-blue-50 text-blue-700 border-blue-100", iconClass: "text-blue-500", text: "Shipped" },
//       "cancelled": { icon: XCircle, badgeClass: "bg-rose-50 text-rose-700 border-rose-100", iconClass: "text-rose-500", text: "Cancelled" }
//     };
//     return configs[statusLower] || { icon: Package, badgeClass: "bg-slate-50 text-slate-700 border-slate-200", iconClass: "text-slate-500", text: status };
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', { 
//       year: 'numeric', month: 'long', day: 'numeric' 
//     });
//   };

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center">
//         <div className="relative">
//             <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
//             <ShoppingBag className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
//         </div>
//         <p className="mt-6 text-slate-500 font-medium tracking-wide">Retrieving your collection...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-[2rem] border border-rose-100 text-center shadow-xl shadow-rose-50">
//         <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
//           <XCircle className="h-8 w-8 text-rose-500" />
//         </div>
//         <h3 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h3>
//         <p className="text-slate-500 mb-8 font-medium">{error}</p>
//         <button onClick={() => window.location.reload()} className="px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold">
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FBFCFE] pb-20">
//       {/* Hero Header */}
//       <div className="bg-slate-900 pt-20 pb-24 px-6 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-1/4 h-full bg-indigo-500/10 blur-[100px]"></div>
//         <div className="max-w-6xl mx-auto relative z-10">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Purchase History</h1>
//               <p className="text-slate-400 mt-2 font-medium">Track and manage your luxury acquisitions</p>
//             </div>

//             {orders.length > 0 && (
//               <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 text-white">
//                 <Filter className="h-4 w-4 text-indigo-400" />
//                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Filter By</span>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="bg-transparent border-none text-sm font-bold focus:outline-none cursor-pointer pr-4"
//                 >
//                   <option value="all" className="text-slate-900">All Purchases</option>
//                   <option value="PENDING" className="text-slate-900">Pending</option>
//                   <option value="PROCESSING" className="text-slate-900">Processing</option>
//                   <option value="SHIPPED" className="text-slate-900">Shipped</option>
//                   <option value="DELIVERED" className="text-slate-900">Delivered</option>
//                   <option value="CANCELLED" className="text-slate-900">Cancelled</option>
//                 </select>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
//         {orders.length === 0 ? (
//           <div className="bg-white rounded-[3rem] p-16 text-center shadow-sm border border-slate-100">
//             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
//               <ShoppingBag className="h-10 w-10 text-slate-200" />
//             </div>
//             <h3 className="text-2xl font-bold text-slate-900 mb-2">No History Yet</h3>
//             <p className="text-slate-400 mb-8 max-w-sm mx-auto font-medium leading-relaxed">
//               Your history is currently a blank canvas. Start your journey with our latest collection.
//             </p>
//             <button onClick={() => window.location.href = '/'} className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all group">
//               Explore Products
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredOrders.map((order) => {
//               const status = getStatusDetails(order.orderStatus || "PROCESSING");
//               const StatusIcon = status.icon;
//               const isExpanded = expandedOrder === order._id;

//               return (
//                 <div key={order._id} className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isExpanded ? 'border-indigo-200 shadow-xl shadow-indigo-50 ring-1 ring-indigo-50' : 'border-slate-100 shadow-sm hover:border-slate-200'}`}>
//                   {/* Summary Card */}
//                   <div className={`p-6 md:p-8 cursor-pointer group`} onClick={() => toggleOrderDetails(order._id)}>
//                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                       <div className="flex-1 space-y-4">
//                         <div className="flex flex-wrap items-center gap-4">
//                           <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest ${status.badgeClass}`}>
//                             <StatusIcon className="h-3.5 w-3.5" />
//                             {status.text}
//                           </div>
//                           <div className="flex items-center gap-2 text-slate-400">
//                             <Hash className="w-3.5 h-3.5" />
//                             <span className="text-xs font-bold uppercase tracking-tighter">{order._id.slice(-10).toUpperCase()}</span>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                           <div className="space-y-1">
//                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ordered On</p>
//                             <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
//                                 <Calendar className="w-4 h-4 text-indigo-500" />
//                                 {formatDate(order.createdAt)}
//                             </div>
//                           </div>
//                           <div className="space-y-1">
//                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment</p>
//                             <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
//                                 <CreditCard className="w-4 h-4 text-indigo-500" />
//                                 {order.paymentMethod}
//                             </div>
//                           </div>
//                           <div className="space-y-1 hidden md:block">
//                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity</p>
//                             <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
//                                 <Package className="w-4 h-4 text-indigo-500" />
//                                 {order.items.length} Items
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between lg:justify-end gap-10 border-t lg:border-t-0 pt-6 lg:pt-0">
//                         <div className="text-right">
//                           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1 leading-none">Total Investment</p>
//                           <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
//                             ₹{order.totalAmount.toLocaleString()}
//                           </p>
//                         </div>
//                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-indigo-600 text-white rotate-90 shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900'}`}>
//                           <ChevronRight className="h-6 w-6" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Expanded Content */}
//                   {isExpanded && (
//                     <div className="bg-slate-50/50 border-t border-slate-100 p-8 space-y-8 animate-in slide-in-from-top-4 duration-500">
//                       <div>
//                         <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
//                             <div className="h-px w-8 bg-slate-200"></div>
//                             Curated Items
//                         </h4>
//                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                           {order.items.map((item) => (
//                             <div key={item._id} className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
//                                 <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-50 flex-shrink-0">
//                                     <img
//                                         src={item.product?.image ? `http://localhost:5000${item.product.image}` : "https://via.placeholder.com/150"}
//                                         className="w-full h-full object-cover"
//                                         alt={item.product?.name}
//                                     />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <p className="font-bold text-slate-900 truncate leading-tight mb-1">{item.product?.name || "Premium Item"}</p>
//                                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Qty: {item.quantity}</p>
//                                     <p className="text-indigo-600 font-black tracking-tight">₹{item.price?.toLocaleString()}</p>
//                                 </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {order.shippingAddress && (
//                           <div className="space-y-4">
//                             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
//                                 <div className="h-px w-8 bg-slate-200"></div>
//                                 Shipping Destination
//                             </h4>
//                             <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
//                                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
//                                     <Truck className="w-20 h-20 text-slate-900" />
//                                 </div>
//                                 <p className="font-black text-slate-900 mb-1">{order.shippingAddress.fullName}</p>
//                                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
//                                     {order.shippingAddress.street}, {order.shippingAddress.city}<br />
//                                     {order.shippingAddress.state} - {order.shippingAddress.zipCode}<br />
//                                     {order.shippingAddress.country}
//                                 </p>
//                                 <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-sm font-bold text-slate-700">
//                                     <span className="text-indigo-500">📱</span> {order.shippingAddress.phone}
//                                 </div>
//                             </div>
//                           </div>
//                         )}

//                         <div className="space-y-4">
//                           <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
//                               <div className="h-px w-8 bg-slate-200"></div>
//                               Financial Statement
//                           </h4>
//                           <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 relative overflow-hidden">
//                              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
//                              <div className="space-y-4 relative z-10">
//                                 <div className="flex justify-between text-sm opacity-60 font-medium">
//                                     <span>Subtotal</span>
//                                     <span>₹{(order.totalAmount - (order.shippingFee || 0)).toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm opacity-60 font-medium">
//                                     <span>Shipping & Handling</span>
//                                     <span>₹{(order.shippingFee || 0).toLocaleString()}</span>
//                                 </div>
//                                 <div className="pt-4 border-t border-white/10 flex justify-between items-end">
//                                     <div>
//                                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">Total Paid</p>
//                                         <p className="text-3xl font-black tracking-tighter italic">₹{order.totalAmount.toLocaleString()}</p>
//                                     </div>
//                                     <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">
//                                         {order.paymentStatus}
//                                     </div>
//                                 </div>
//                              </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../api/axios";
import { 
  Calendar, 
  Package, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Clock,
  XCircle,
  ChevronRight,
  ShoppingBag,
  Filter,
  ArrowRight,
  Hash,
  User
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Helper functions for avatar (for admin view - if you show user info)
  const getInitials = (name) => {
    if (!name) return "C";
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
      "bg-amber-500"
    ];
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charSum % colors.length;
    return colors[colorIndex];
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await API.get("/user/orders/my");
        setOrders(res.data.orders);
        setFilteredOrders(res.data.orders);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
       ( order.orderStatus || "PROCESSING").toUpperCase() === statusFilter.toUpperCase()
      );
      setFilteredOrders(filtered);
    }
  }, [statusFilter, orders]);

  const getStatusDetails = (status) => {
    const statusLower = status.toLowerCase();
    const configs = {
      "delivered": { icon: CheckCircle, badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-100", iconClass: "text-emerald-500", text: "Delivered" },
      "pending": { icon: Clock, badgeClass: "bg-amber-50 text-amber-700 border-amber-100", iconClass: "text-amber-500", text: "Pending" },
      "processing": { icon: Package, badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-100", iconClass: "text-indigo-500", text: "Processing" },
      "shipped": { icon: Truck, badgeClass: "bg-blue-50 text-blue-700 border-blue-100", iconClass: "text-blue-500", text: "Shipped" },
      "cancelled": { icon: XCircle, badgeClass: "bg-rose-50 text-rose-700 border-rose-100", iconClass: "text-rose-500", text: "Cancelled" }
    };
    return configs[statusLower] || { icon: Package, badgeClass: "bg-slate-50 text-slate-700 border-slate-200", iconClass: "text-slate-500", text: status };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <ShoppingBag className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="mt-6 text-slate-500 font-medium tracking-wide">Retrieving your collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-[2rem] border border-rose-100 text-center shadow-xl shadow-rose-50">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-8 w-8 text-rose-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h3>
        <p className="text-slate-500 mb-8 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFCFE] pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-indigo-500/10 blur-[100px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Purchase History</h1>
              <p className="text-slate-400 mt-2 font-medium">Track and manage your luxury acquisitions</p>
            </div>

            {orders.length > 0 && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 text-white">
                <Filter className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Filter By</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-none text-sm font-bold focus:outline-none cursor-pointer pr-4"
                >
                  <option value="all" className="text-slate-900">All Purchases</option>
                  <option value="PENDING" className="text-slate-900">Pending</option>
                  <option value="PROCESSING" className="text-slate-900">Processing</option>
                  <option value="SHIPPED" className="text-slate-900">Shipped</option>
                  <option value="DELIVERED" className="text-slate-900">Delivered</option>
                  <option value="CANCELLED" className="text-slate-900">Cancelled</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-16 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No History Yet</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto font-medium leading-relaxed">
              Your history is currently a blank canvas. Start your journey with our latest collection.
            </p>
            <button onClick={() => window.location.href = '/'} className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all group">
              Explore Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const status = getStatusDetails(order.orderStatus || "PROCESSING");
              const StatusIcon = status.icon;
              const isExpanded = expandedOrder === order._id;

              return (
                <div key={order._id} className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isExpanded ? 'border-indigo-200 shadow-xl shadow-indigo-50 ring-1 ring-indigo-50' : 'border-slate-100 shadow-sm hover:border-slate-200'}`}>
                  {/* Summary Card */}
                  <div className={`p-6 md:p-8 cursor-pointer group`} onClick={() => toggleOrderDetails(order._id)}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest ${status.badgeClass}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.text}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Hash className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold uppercase tracking-tighter">{order._id.slice(-10).toUpperCase()}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ordered On</p>
                            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                                <Calendar className="w-4 h-4 text-indigo-500" />
                                {formatDate(order.createdAt)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment</p>
                            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                                <CreditCard className="w-4 h-4 text-indigo-500" />
                                {order.paymentMethod}
                            </div>
                          </div>
                          <div className="space-y-1 hidden md:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity</p>
                            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                                <Package className="w-4 h-4 text-indigo-500" />
                                {order.items.length} Items
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-10 border-t lg:border-t-0 pt-6 lg:pt-0">
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1 leading-none">Total Investment</p>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                            ₹{order.totalAmount.toLocaleString()}
                          </p>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-indigo-600 text-white rotate-90 shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900'}`}>
                          <ChevronRight className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="bg-slate-50/50 border-t border-slate-100 p-8 space-y-8 animate-in slide-in-from-top-4 duration-500">
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-slate-200"></div>
                            Curated Items
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {order.items.map((item) => (
                            <div key={item._id} className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-50 flex-shrink-0">
                                    <img
                                        src={item.product?.image ? `http://localhost:5000${item.product.image}` : "https://via.placeholder.com/150"}
                                        className="w-full h-full object-cover"
                                        alt={item.product?.name}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 truncate leading-tight mb-1">{item.product?.name || "Premium Item"}</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Qty: {item.quantity}</p>
                                    <p className="text-indigo-600 font-black tracking-tight">₹{item.price?.toLocaleString()}</p>
                                </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {order.shippingAddress && (
                          <div className="space-y-4">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                                <div className="h-px w-8 bg-slate-200"></div>
                                Shipping Destination
                            </h4>
                            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Truck className="w-20 h-20 text-slate-900" />
                                </div>
                                <p className="font-black text-slate-900 mb-1">{order.shippingAddress.fullName}</p>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    {order.shippingAddress.street}, {order.shippingAddress.city}<br />
                                    {order.shippingAddress.state} - {order.shippingAddress.zipCode}<br />
                                    {order.shippingAddress.country}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <span className="text-indigo-500">📱</span> {order.shippingAddress.phone}
                                </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-4">
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                              <div className="h-px w-8 bg-slate-200"></div>
                              Financial Statement
                          </h4>
                          <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 relative overflow-hidden">
                             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                             <div className="space-y-4 relative z-10">
                                <div className="flex justify-between text-sm opacity-60 font-medium">
                                    <span>Subtotal</span>
                                    <span>₹{(order.totalAmount - (order.shippingFee || 0)).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm opacity-60 font-medium">
                                    <span>Shipping & Handling</span>
                                    <span>₹{(order.shippingFee || 0).toLocaleString()}</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">Total Paid</p>
                                        <p className="text-3xl font-black tracking-tighter italic">₹{order.totalAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                        {order.paymentStatus}
                                    </div>
                                </div>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}