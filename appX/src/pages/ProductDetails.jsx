import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast'; 
import { ShoppingBag, Heart, ChevronLeft, Star, ShieldCheck, Truck, RefreshCw, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const res = await API.get(`/user/products/${id}`);
      setProduct(res.data.product || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await API.post(`/user/cart/add/${id}`, { quantity });
      toast.success("Added to your bag", { icon: '🛍️' });
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  const addToWishlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await API.post(`/user/wishlist/add/${id}`);
      toast.success("Saved to favorites", { icon: '💖' });
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  const generateRandomRating = () => (4.0 + Math.random() * 1.0).toFixed(1);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-serif text-slate-900 mb-6">Discovery Unsuccessful</h2>
        <p className="text-slate-500 mb-8">The piece you're looking for seems to have vanished.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-600 transition-all"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const productImages = [
    product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/600x600",
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFD] pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Navigation / Breadcrumb */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors mb-10"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center p-12">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {productImages.length > 1 && (
              <div className="flex gap-4 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-2xl border-2 transition-all overflow-hidden ${
                      selectedImage === index ? "border-indigo-600 scale-105" : "border-transparent opacity-60"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Tag & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                {product.category || "Premium Choice"}
              </span>
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-800">{generateRandomRating()}</span>
                <span className="text-amber-300 text-[10px]">|</span>
                <span className="text-[10px] text-amber-800 uppercase font-bold tracking-tighter">Verified Review</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-serif text-slate-900 leading-tight mb-6">
              {product.name}
            </h1>

            {/* Price Block */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-slate-400 line-through font-light">₹{product.oldPrice}</span>
                  <span className="text-emerald-600 font-bold text-sm tracking-tight bg-emerald-50 px-2 py-0.5 rounded-lg">
                    SAVE {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-slate-500 text-lg leading-relaxed mb-10 pb-10 border-b border-slate-100 italic">
              "{product.description || "A beautifully crafted piece designed for longevity and timeless play."}"
            </p>

            {/* Controls */}
            <div className="space-y-8 mb-10">
              <div className="flex items-center gap-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Select Quantity</h3>
                <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-slate-600" />
                  </button>
                  <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={addToCart}
                  className="flex-[2] bg-slate-900 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Shopping Bag
                </button>
                <button
                  onClick={addToWishlist}
                  className="flex-1 bg-white border-2 border-slate-200 text-slate-900 font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95"
                >
                  <Heart className="w-5 h-5" /> Save
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-full text-slate-600"><Truck className="w-5 h-5" /></div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-full text-slate-600"><ShieldCheck className="w-5 h-5" /></div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Eco-Safe Materials</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-full text-slate-600"><RefreshCw className="w-5 h-5" /></div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}