import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import toast from 'react-hot-toast';
import { ShoppingCart, Heart, Search, SlidersHorizontal, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Products() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = category
        ? `/user/products?category=${category}`
        : "/user/products";
      const res = await API.get(url);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = [...products]
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  const addToWishlist = async (id) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await API.post(`/user/wishlist/add/${id}`);
      toast.success("Saved to favorites", {
        style: { border: '1px solid #6366f1', color: '#e5e4eeff' }
      });
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  const addToCart = async (id) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await API.post(`/user/cart/add/${id}`);
      toast.success("Added to your bag", {
        icon: '🛍️',
        style: { backgroundColor: '#1e293b', color: '#fff' }
      });
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  const generateRandomRating = (id) => {
    // seeded random based on id for consistency
    const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
    return (4.0 + (seed % 10) / 10).toFixed(1);
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          </div>
        </div>
        <p className="text-slate-400 font-medium animate-pulse">Curating your collection...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FCFCFD]">
      {/* Dynamic Header Section */}
      <section className="bg-white border-b border-slate-100 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-3 block">
                {category ? `${category} Collection` : "Full Catalog"}
              </span>
              <h1 className="text-5xl font-serif text-slate-900 leading-tight">
                {category ? category : "The Playora"} <br />
                <span className="italic font-light text-slate-500">Selection</span>
              </h1>
            </motion.div>
            <p className="text-slate-500 max-w-sm text-lg leading-relaxed border-l-2 border-indigo-50 pl-6">
              Hand-picked essentials designed to spark joy and foster development in every stage of childhood.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="What are you looking for today?"
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none min-w-[200px]">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <select
                className="w-full pl-10 pr-10 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm appearance-none focus:ring-4 focus:ring-indigo-50 outline-none cursor-pointer font-medium text-slate-700"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <option value="">Recommended</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          {filteredProducts.map((p, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={p._id}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-lg shadow-slate-200/50 mb-6">
                <img
                  src={p.image ? `http://localhost:5000${p.image}` : "https://via.placeholder.com/400x500"}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  alt={p.name}
                />
                
                {/* Wishlist Floating Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(p._id);
                  }}
                  className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-md text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-90 transition-all"
                >
                  <Heart className="w-5 h-5" fill={user?.wishlist?.includes(p._id) ? "currentColor" : "none"} />
                </button>

                {/* Hover Quick View Overlay */}
                <div 
                  onClick={() => navigate(`/products/${p._id}`)}
                  className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <span className="px-6 py-2.5 bg-white rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 
                    className="text-xl font-serif text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1 flex-1"
                    onClick={() => navigate(`/products/${p._id}`)}
                  >
                    {p.name}
                  </h3>
                  <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-indigo-600 fill-indigo-600 mr-1" />
                    <span className="text-xs font-bold text-indigo-700">{generateRandomRating(p._id)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-slate-900">₹{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">₹{p.originalPrice}</span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(p._id)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-95 group-hover:shadow-indigo-100"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 mb-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-2">No matches found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-8">
              We couldn't find what you were looking for. Try a different search term or category.
            </p>
            <button 
              onClick={() => {setSearch(""); fetchProducts();}}
              className="px-8 py-3 bg-indigo-50 text-indigo-700 rounded-full font-bold text-sm hover:bg-indigo-100 transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}