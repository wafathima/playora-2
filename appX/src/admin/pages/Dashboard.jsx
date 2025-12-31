import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Package, ShoppingBag, DollarSign, 
  TrendingUp, Clock, AlertCircle, CheckCircle,
  ArrowUpRight, ArrowDownRight, Eye, Download,
  RefreshCcw, ChevronRight, Zap
} from 'lucide-react';
import { adminAPI } from '../../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.get('/admin/dashboard/stats');
      if (response.data.success) {
        setStats(response.data.stats);
        setRecentOrders(response.data.recentOrders || []);
        setRecentUsers(response.data.recentUsers || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'SHIPPED': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'PROCESSING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'PLACED': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <RefreshCcw className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="mt-4 text-slate-400 font-medium tracking-widest text-xs uppercase">Initializing System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-slate-200 p-4 md:p-8 space-y-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Intelligence Console</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live: Monitoring Playora Atelier Performance
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-800 transition-all flex items-center text-sm font-semibold">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button 
            onClick={() => fetchDashboardData()}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center text-sm font-semibold"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Sync Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '+15.3%', link: '/admin/orders' },
          { label: 'Customers', value: stats.totalUsers, icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10', trend: '+12.5%', link: '/admin/users' },
          { label: 'Active Orders', value: stats.totalOrders, icon: Package, color: 'text-indigo-400', bg: 'bg-indigo-500/10', trend: '+8.2%', link: '/admin/orders' },
          { label: 'Inventory', value: stats.totalProducts, icon: ShoppingBag, color: 'text-rose-400', bg: 'bg-rose-500/10', trend: '-2.1%', link: '/admin/products' },
        ].map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#151B2C] border border-slate-800 p-6 rounded-[2rem] hover:border-slate-700 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-slate-900 ${item.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.trend}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{item.value}</h3>
            </div>
            <button 
              onClick={() => navigate(item.link)}
              className="w-full mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-indigo-400 transition-colors"
            >
              METRICS DETAIL <ArrowUpRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-[#151B2C] border border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" /> Recent Transactions
            </h2>
            <button onClick={() => navigate('/admin/orders')} className="text-xs font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">View Ledger</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-500 text-[10px] uppercase tracking-[0.2em] bg-slate-900/50">
                  <th className="px-8 py-4 font-black">Ref ID</th>
                  <th className="px-8 py-4 font-black">Customer</th>
                  <th className="px-8 py-4 font-black">Amount</th>
                  <th className="px-8 py-4 font-black">Status</th>
                  <th className="px-8 py-4 font-black text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5 text-sm font-mono text-slate-400">#{order._id.toString().slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-bold text-white">{order.user?.name || 'Guest'}</div>
                      <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-200">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-[10px] font-black rounded-full border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 bg-slate-800 rounded-xl hover:bg-indigo-600 transition-all">
                        <Eye className="w-4 h-4 text-slate-300" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users List */}
        <div className="bg-[#151B2C] border border-slate-800 rounded-[2.5rem] p-8">
          <h2 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> New Sign-ups
          </h2>
          <div className="space-y-6">
            {recentUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                    {user.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/admin/users')}
            className="w-full mt-10 py-4 border border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-800 transition-all"
          >
            Audit All Users
          </button>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Inventory Management', desc: 'Catalog new arrivals and stock.', icon: ShoppingBag, color: 'indigo', link: '/admin/products/add' },
          { title: 'Order Fulfillment', desc: 'Process pending shipments.', icon: Package, color: 'emerald', link: '/admin/orders' },
          { title: 'Customer Relations', desc: 'Manage user accounts and tiers.', icon: Users, color: 'amber', link: '/admin/users' },
        ].map((action) => (
          <button 
            key={action.title}
            onClick={() => navigate(action.link)}
            className="p-6 bg-[#151B2C] border border-slate-800 rounded-[2rem] text-left hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl bg-${action.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-6 h-6 text-${action.color}-400`} />
            </div>
            <h3 className="font-bold text-white text-lg mb-1">{action.title}</h3>
            <p className="text-slate-500 text-sm mb-4">{action.desc}</p>
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-indigo-400">
              Launch Module <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;