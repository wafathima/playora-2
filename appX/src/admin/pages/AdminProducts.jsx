import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { adminAPI } from "../../api/axios";
import {
  Search, Filter, Edit, Trash2, Eye,
  Package, DollarSign, Tag, Box, Plus, Loader2, AlertCircle, 
  ChevronLeft, ChevronRight, RefreshCw
} from "lucide-react";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteModal, setDeleteModal] = useState({ show: false, productId: null, productName: "" });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 

  const categories = [
    "all",
    "Educational Toy",
    "Outdoor",
    "Action",
    "Vehicle"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.get("/admin/products"); 
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.productId) return;
    setDeleteLoading(true);
    try {
      const response = await adminAPI.delete(`/admin/products/${deleteModal.productId}`);
      if (response.data.success) {
        setProducts(products.filter(p => p._id !== deleteModal.productId));
        setDeleteModal({ show: false, productId: null, productName: "" });
      }
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (productId, productName) => {
    setDeleteModal({ show: true, productId, productName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, productId: null, productName: "" });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" ||
                           product.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalFilteredPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToNextPage = () => { if (currentPage < totalFilteredPages) setCurrentPage(currentPage + 1); };
  const goToPrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return "bg-red-500/10 text-red-400 border-red-500/20";
    if (stock <= 10) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#0f1117]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-200 p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Products</h1>
          <p className="text-slate-400 mt-1">Manage and monitor your store inventory</p>
        </div>
        <Link
          to="/admin/products/add"
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: products.length, icon: Package, color: "indigo" },
          { label: "Low Stock", value: products.filter(p => p.stock <= 10 && p.stock > 0).length, icon: AlertCircle, color: "amber" },
          { label: "Out of Stock", value: products.filter(p => p.stock === 0).length, icon: Box, color: "red" },
          { label: "Inventory Value", value: formatCurrency(products.reduce((sum, p) => sum + (p.price * p.stock), 0)), icon: DollarSign, color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1e222d] p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <h3 className="text-xl font-bold text-white mt-1">{stat.value}</h3>
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-[#1e222d] border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-[#1e222d] border border-slate-800 rounded-xl px-3">
          <Filter className="w-5 h-5 text-slate-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent py-3 pr-2 outline-none text-white min-w-[160px]"
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-[#1e222d]">{c === "all" ? "All Categories" : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1e222d] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold text-center w-20">Image</th>
                <th className="px-6 py-4 font-semibold">Product Details</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentProducts.map(product => (
                <tr key={product._id} className="hover:bg-[#252a37] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                      {product.image ? (
                        <img 
                          src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                          alt="" className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600"><Package size={20}/></div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">{product.name}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">{product.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm px-2.5 py-1 bg-slate-800 rounded-md text-slate-300 border border-slate-700">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStockStatus(product.stock)}`}>
                      {product.stock === 0 ? "OUT OF STOCK" : `${product.stock} IN STOCK`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/admin/products/edit/${product._id}`)} className="p-2 hover:bg-indigo-500/20 text-indigo-400 rounded-lg transition-colors"><Edit size={18}/></button>
                      <button onClick={() => openDeleteModal(product._id, product.name)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      <button onClick={() => navigate(`/product/${product._id}`)} className="p-2 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors"><Eye size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10">
        <p className="text-sm text-slate-500">
          Showing <span className="text-white font-medium">{indexOfFirstProduct + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of <span className="text-white font-medium">{filteredProducts.length}</span> products
        </p>
        <div className="flex items-center gap-2">
          <button 
            onClick={goToPrevPage} disabled={currentPage === 1}
            className="p-2 bg-[#1e222d] border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 text-white"
          >
            <ChevronLeft size={20}/>
          </button>
          <div className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-bold shadow-lg shadow-indigo-500/20">
            {currentPage}
          </div>
          <button 
            onClick={goToNextPage} disabled={currentPage === totalFilteredPages}
            className="p-2 bg-[#1e222d] border border-slate-800 rounded-lg disabled:opacity-30 hover:bg-slate-800 text-white"
          >
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e222d] border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-red-500/10 rounded-full mb-4">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Delete Product?</h3>
              <p className="text-slate-400 mt-2">
                Are you sure you want to delete <span className="text-white font-bold">"{deleteModal.productName}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={closeDeleteModal} className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">Cancel</button>
              <button 
                onClick={handleDelete} disabled={deleteLoading}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                {deleteLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Delete Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}