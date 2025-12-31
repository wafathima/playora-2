import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Heart, ShoppingCart, Trash2, Eye, ArrowRight, Sparkles } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const res = await API.get("/user/wishlist");
      const cleanWishlist = (res.data.wishlist || []).filter(item => item !== null);
      setWishlist(cleanWishlist);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await API.delete(`/user/wishlist/remove/${id}`);
      loadWishlist();
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const addToCart = async (id) => {
    try {
      await API.post(`/user/cart/add/${id}`);
      navigate("/cart");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFCFE] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-200 rounded-2xl w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-[2rem] p-5 border border-slate-100 h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFCFE] pb-20">
      {/* Decorative Header Background */}
      <div className="h-64 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FBFCFE] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-white/10 backdrop-blur-md rounded-xl inline-block">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Curated Favorites</h1>
            </div>
            <p className="text-indigo-100/70 font-medium ml-12">Premium selections saved for your next masterpiece.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[2rem] px-8 py-4 flex items-center gap-4 self-start md:self-auto">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 opacity-60">Collection Size</p>
              <p className="text-xl font-bold text-white leading-none">{wishlist.length} Items</p>
            </div>
          </div>
        </div>

        {wishlist.length === 0 ? (
          /* Elegant Empty State */
          <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 p-16 text-center max-w-3xl mx-auto">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-indigo-100 rounded-full blur-2xl opacity-50 scale-150"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-indigo-50 to-slate-50 rounded-full flex items-center justify-center border border-white">
                <Heart className="w-12 h-12 text-slate-300" strokeWidth={1} />
              </div>
            </div>
            <h3 className="text-3xl font-serif text-slate-900 mb-4">Your collection is quiet</h3>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">
              Discover unique pieces and save them here to curate your personal style gallery.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="group inline-flex items-center gap-3 bg-slate-900 text-white font-bold py-4 px-10 rounded-2xl transition-all hover:bg-indigo-600 hover:scale-105 shadow-xl shadow-slate-200"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlist.map((item) => {
                if (!item) return null;
                return (
                  <div
                    key={item._id}
                    className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col h-full"
                  >
                    {/* Visual Container */}
                    <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[2rem]">
                      <img
                        src={item.image ? `http://localhost:5000${item.image}` : "https://via.placeholder.com/400x500"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Premium Glass Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Quick Floating Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-75">
                        <button
                          onClick={() => removeFromWishlist(item._id)}
                          className="p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-2xl shadow-xl hover:bg-red-500 hover:text-white transition-all"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute bottom-6 left-0 right-0 px-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                        <button
                          onClick={() => navigate(`/products/${item._id}`)}
                          className="w-full bg-white/95 backdrop-blur-md text-slate-900 font-bold py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all"
                        >
                          <Eye className="w-4 h-4" /> Quick View
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-indigo-600">
                            ₹{item.price ? item.price.toLocaleString() : 0}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-medium">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Main Interaction */}
                      <div className="mt-auto pt-4 border-t border-slate-50">
                        <button
                          onClick={() => addToCart(item._id)}
                          className="w-full group/btn flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-900 text-slate-600 hover:text-white font-black text-[11px] uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-300"
                        >
                          <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          Move to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Premium Footer Actions */}
            <div className="mt-20 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex -space-x-4">
                  {wishlist.slice(0, 3).map((item, i) => (
                    <img key={i} src={`http://localhost:5000${item.image}`} className="w-12 h-12 rounded-full border-4 border-white object-cover" />
                  ))}
                  {wishlist.length > 3 && (
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      +{wishlist.length - 3}
                    </div>
                  )}
                </div>
                <p className="text-slate-500 font-medium">
                  You have <span className="text-slate-900 font-bold">{wishlist.length} exclusive items</span> ready for purchase.
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => navigate("/products")}
                  className="flex-1 md:flex-none px-8 py-4 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl font-bold text-sm transition-all"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 md:flex-none px-8 py-4 bg-slate-900 text-white hover:bg-indigo-600 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-slate-200"
                >
                  View Shopping Bag
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}