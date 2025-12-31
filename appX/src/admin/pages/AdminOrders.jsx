import React, { useState, useEffect } from "react"; // Fixed: Added React import
import { adminAPI } from "../../api/axios";
import {
  Search, Filter, Eye, Truck, CheckCircle, Clock,
  Package, User, Calendar, Download,
  ChevronDown, ChevronUp, Loader2, AlertCircle, RefreshCw,
  Mail, Phone
} from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statuses = [
    { value: "all", label: "All Status", color: "gray" },
    { value: "PLACED", label: "Placed", color: "purple" },
    { value: "PROCESSING", label: "Processing", color: "amber" },
    { value: "SHIPPED", label: "Shipped", color: "blue" },
    { value: "DELIVERED", label: "Delivered", color: "emerald" },
  ];

  const paymentStatuses = {
    "PENDING": { color: "amber", icon: <Clock className="w-3.5 h-3.5" /> },
    "PAID": { color: "emerald", icon: <CheckCircle className="w-3.5 h-3.5" /> },
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await adminAPI.get("/admin/orders");
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      const response = await adminAPI.put(`/admin/orders/${orderId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        ));
        setSelectedOrder(null);
      }
    } catch (err) {
      setError("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PLACED": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "PROCESSING": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "SHIPPED": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "DELIVERED": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PLACED": return <Package className="w-4 h-4" />;
      case "PROCESSING": return <Loader2 className="w-4 h-4 animate-spin" />;
      case "SHIPPED": return <Truck className="w-4 h-4" />;
      case "DELIVERED": return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter(order => order.paymentStatus === "PAID")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#0f1117] text-white">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-200 p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Orders</h1>
          <p className="text-slate-400 mt-1">
            <span className="text-indigo-400 font-semibold">{filteredOrders.length}</span> orders found • 
            <span className="text-emerald-400 font-semibold ml-1">${totalRevenue.toLocaleString()}</span> revenue
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchOrders} className="p-2.5 bg-[#1e222d] border border-slate-700 rounded-xl hover:bg-[#2a2f3e] transition-colors">
            <RefreshCw className="w-5 h-5 text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: orders.length, color: "indigo", icon: Package },
          { label: "Processing", value: orders.filter(o => o.orderStatus === "PROCESSING").length, color: "amber", icon: Clock },
          { label: "Shipped", value: orders.filter(o => o.orderStatus === "SHIPPED").length, color: "blue", icon: Truck },
          { label: "Completed", value: orders.filter(o => o.orderStatus === "DELIVERED").length, color: "emerald", icon: CheckCircle },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1e222d] p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-11 pr-4 py-3 bg-[#1e222d] border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-[#1e222d] border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-white min-w-[160px]"
        >
          {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#1e222d] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className={`hover:bg-[#252a37] transition-colors ${expandedOrder === order._id ? 'bg-[#252a37]' : ''}`}>
                    <td className="px-6 py-5">
                      <span className="text-sm font-mono text-indigo-400 font-bold">#{order._id.slice(-8).toUpperCase()}</span>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase">{formatDate(order.createdAt)}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                          {order.user?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{order.user?.name}</p>
                          <p className="text-xs text-slate-500">{order.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-white">${order.totalAmount.toFixed(2)}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-${paymentStatuses[order.paymentStatus]?.color}-500/10 text-${paymentStatuses[order.paymentStatus]?.color}-400 mt-1 inline-block`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.orderStatus)}`}>
                        {getStatusIcon(order.orderStatus)} {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                          className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"
                        >
                          {expandedOrder === order._id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                        </button>
                        <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-indigo-500/20 rounded-lg text-indigo-400">
                          <RefreshCw size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded View */}
                  {expandedOrder === order._id && (
                    <tr className="bg-[#161a23]">
                      <td colSpan="5" className="px-8 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-1">
                          <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Items Ordered</h4>
                            <div className="space-y-3">
                              {order.items?.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-[#1e222d] rounded-xl border border-slate-800">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-800 rounded-lg" />
                                    <div>
                                      <p className="text-sm font-bold text-white">{item.name}</p>
                                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="text-sm font-bold text-indigo-400">${item.price.toFixed(2)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-[#1e222d] p-5 rounded-2xl border border-slate-800">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contact Detail</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-3 text-slate-300"><Mail size={16} className="text-slate-500"/> {order.user?.email}</div>
                              {order.user?.phone && <div className="flex items-center gap-3 text-slate-300"><Phone size={16} className="text-slate-500"/> {order.user.phone}</div>}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e222d] border border-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="p-6 text-center border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">Update Status</h3>
              <p className="text-sm text-slate-500 mt-1">Order #{selectedOrder._id.slice(-8).toUpperCase()}</p>
            </div>
            <div className="p-4 space-y-2">
              {statuses.filter(s => s.value !== "all").map((s) => (
                <button
                  key={s.value}
                  onClick={() => updateOrderStatus(selectedOrder._id, s.value)}
                  disabled={updating}
                  className={`w-full p-4 rounded-2xl text-left flex items-center justify-between group transition-all
                    ${selectedOrder.orderStatus === s.value ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                >
                  <span className="font-bold">{s.label}</span>
                  {selectedOrder.orderStatus === s.value && <CheckCircle size={20} />}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedOrder(null)} className="w-full p-4 text-slate-500 hover:text-white font-semibold transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}