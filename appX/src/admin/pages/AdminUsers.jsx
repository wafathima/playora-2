import React, { useState, useEffect } from "react"; 
import { adminAPI } from "../../api/axios";
import {
  Search, User, UserCheck, UserX, Mail, Calendar,
  Shield, ShieldOff, Loader2, AlertCircle, Users,
  CheckCircle, Clock, RefreshCw, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight
} from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [stats, setStats] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.get("/admin/users");
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminAPI.get("/admin/users/stats");
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? "unblock" : "block"} this user?`)) return;
    setUpdating(true);
    try {
      const response = await adminAPI.patch(`/admin/users/${userId}/block`, {
        action: currentStatus ? "unblock" : "block"
      });
      if (response.data.success) {
        setUsers(users.map(user => user._id === userId ? response.data.user : user));
        setSuccess(response.data.message);
        fetchStats();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setUpdating(false);
    }
  };

  const toggleRowExpand = (userId) => {
    setExpandedRows(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  // Workings/Logic (Filtering & Pagination)
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === "all" || 
      (filter === "active" && !user.isBlocked) ||
      (filter === "blocked" && user.isBlocked);
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };
  const goToPrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };

  const formatDate = (date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const timeSince = (date) => {
    if (!date) return "Never";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    return "Just now";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1117]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-200 p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-slate-400 mt-1">Monitor access for all registered members</p>
        </div>
        <button
          onClick={fetchUsers}
          className="flex items-center justify-center px-6 py-3 bg-[#1e222d] border border-slate-800 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg"
          disabled={updating}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "indigo" },
          { label: "Active Now", value: stats?.activeUsers || 0, icon: UserCheck, color: "emerald" },
          { label: "Blocked Access", value: stats?.blockedUsers || 0, icon: UserX, color: "red" },
          { label: "New Today", value: stats?.newUsersToday || 0, icon: Calendar, color: "purple" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1e222d] p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-[#1e222d] border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex p-1 bg-[#1e222d] border border-slate-800 rounded-xl">
          {["all", "active", "blocked"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                filter === type ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1e222d] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Login</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentUsers.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center text-slate-500">No matching users found</td></tr>
              ) : (
                currentUsers.map(user => (
                  <React.Fragment key={user._id}>
                    <tr className={`hover:bg-[#252a37] transition-colors group ${expandedRows[user._id] ? 'bg-[#252a37]' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                            {user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">{user.name || "Guest"}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${
                          user.isBlocked ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}>
                          {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{timeSince(user.lastLogin)}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{formatDate(user.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                              user.isBlocked
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                            }`}
                          >
                            {user.isBlocked ? "UNBLOCK" : "BLOCK"}
                          </button>
                          <button onClick={() => toggleRowExpand(user._id)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg">
                            {expandedRows[user._id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows[user._id] && (
                      <tr className="bg-[#1a1e28]">
                        <td colSpan="5" className="px-6 py-6 border-l-4 border-indigo-500">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-500 uppercase">Insights</h4>
                              <div className="bg-[#0f1117] rounded-xl p-4 space-y-2 border border-slate-800">
                                <div className="flex justify-between text-sm"><span className="text-slate-500">Role</span><span className="text-indigo-400 font-bold uppercase">{user.role}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-slate-500">Logins</span><span className="text-white font-bold">{user.loginCount || 0}</span></div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-500 uppercase">Access</h4>
                              <button onClick={() => handleToggleBlock(user._id, user.isBlocked)} className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${user.isBlocked ? "bg-indigo-600" : "bg-red-600"} text-white`}>
                                {user.isBlocked ? <Shield size={18} /> : <ShieldOff size={18} />}
                                {user.isBlocked ? "Restore Access" : "Revoke Access"}
                              </button>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-500 uppercase">Quick Actions</h4>
                              <div className="flex flex-col gap-2">
                                <button className="w-full py-2 bg-slate-800 rounded-lg text-sm font-medium">View History</button>
                                <button className="w-full py-2 bg-slate-800 rounded-lg text-sm font-medium">Message User</button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10">
        <p className="text-sm text-slate-500">Showing {currentUsers.length} of {filteredUsers.length} users</p>
        <div className="flex items-center gap-2">
          <button onClick={goToPrevPage} disabled={currentPage === 1} className="p-2 bg-[#1e222d] border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 text-white transition-colors">
            <ChevronLeft size={20}/>
          </button>
          <div className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-bold shadow-lg shadow-indigo-500/20">{currentPage}</div>
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className="p-2 bg-[#1e222d] border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 text-white transition-colors">
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
}