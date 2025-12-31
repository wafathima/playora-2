import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import { 
  CreditCard, 
  Package, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Truck,
  Lock,
  ShoppingBag,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await API.get("/user/cart");
        setCart(res.data.cart || []);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    loadCart();
  }, [navigate]);

  const total = cart.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + (item.product.price * item.quantity);
  }, 0);

  const shippingCost = total > 0 ? 5.00 : 0;
  const grandTotal = total + shippingCost;

  const placeOrder = async () => {
  if (cart.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }
  setLoading(true);
  try {
    await API.post("/user/orders/place");
    setIsSuccess(true); 
  } catch (error) {
    toast.error("Order failed");
  } finally {
    setLoading(false);
  }
};

  const payWithRazorpay = async () => {
    try {
      const { data } = await API.post("/user/orders/razorpay/create", {
        amount: grandTotal * 100, 
        currency: "INR"
      });

      if (typeof window.Razorpay === 'undefined') {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => {
            openRazorpay(data);
            resolve();
          };
          script.onerror = () => {
            toast.error("Payment service unavailable. Please try COD.");
            reject();
          };
          document.body.appendChild(script);
        });
      } else {
        openRazorpay(data);
      }
    } catch (error) {
      toast.error("Payment initialization failed. Try Cash on Delivery.");
      setLoading(false);
    }
  };

  const openRazorpay = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_xxxxxxxxxxxxx",
      amount: data.amount || (grandTotal * 100),
      currency: "INR",
      name: "Playora Store",
      description: "Order Payment",
      order_id: data.id,
      handler: async (response) => {
        try {
          await API.post("/user/orders/razorpay/verify", response);
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/orders");
          }, 1500);
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#6366f1"
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
          toast("Payment cancelled");
        },
        escape: false,
        backdropclose: false
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Could not open payment gateway");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFE] pb-20">
      {/* Elegant Header Section */}
      <div className="bg-slate-900 pt-16 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-indigo-300 hover:text-white mb-8 transition-all font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Checkout</h1>
              <p className="text-slate-400 mt-2 font-medium">Finalize your curated collection</p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <div className="p-3 bg-indigo-500 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">Total Investment</p>
                <p className="text-xl font-bold text-white leading-none">₹{grandTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-3">
                  <Package className="w-5 h-5 text-indigo-500" />
                  Your Selection
                </h2>
                <span className="text-xs font-bold text-slate-400">{cart.length} Pieces</span>
              </div>
              
              <div className="divide-y divide-slate-50 px-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">Your selection is empty</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={item._id || index} className="flex items-center justify-between p-6 group">
                      <div className="flex items-center gap-6">
                        <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                          <img
                            src={item.product?.image ? `http://localhost:5000${item.product.image}` : "https://via.placeholder.com/400x300"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            alt={item.product?.name}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{item.product?.name}</h3>
                          <p className="text-xs font-bold text-slate-400 mt-1">
                            Qty: <span className="text-indigo-500">{item.quantity}</span> • ₹{item.product?.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-black text-slate-900 tracking-tight text-lg">
                        ₹{(item.product?.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                Payment Gallery
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                    paymentMethod === "COD" 
                      ? "border-indigo-500 bg-indigo-50/30" 
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${paymentMethod === "COD" ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                      <Truck className="w-6 h-6" />
                    </div>
                    {paymentMethod === "COD" && <CheckCircle className="w-5 h-5 text-indigo-500" />}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Cash on Delivery</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">Settle your investment upon physical delivery</p>
                </div>

                <div
                  className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                    paymentMethod === "RAZORPAY" 
                      ? "border-indigo-500 bg-indigo-50/30" 
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                  onClick={() => setPaymentMethod("RAZORPAY")}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${paymentMethod === "RAZORPAY" ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                      <Lock className="w-6 h-6" />
                    </div>
                    {paymentMethod === "RAZORPAY" && <CheckCircle className="w-5 h-5 text-indigo-500" />}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Razorpay Secure</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">Instant verification via cards, UPI or NetBanking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 p-8 sticky top-10">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8">Investment Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">Subtotal</span>
                  <span className="text-slate-900 font-bold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">Shipping Fee</span>
                  <span className="text-slate-900 font-bold">{total > 0 ? `₹${shippingCost.toFixed(2)}` : "Free"}</span>
                </div>
                <div className="flex justify-between text-sm pt-4 border-t border-slate-50">
                  <span className="text-slate-400 font-medium">VAT / Tax</span>
                  <span className="text-slate-900 font-bold">₹0.00</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 mb-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Final Amount</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">
                      ₹{grandTotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8 flex items-center gap-3 px-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">Encrypted Checkout</p>
              </div>

              <button
                onClick={() => { 
                  if (paymentMethod === "COD") placeOrder();
                  else payWithRazorpay();
                }}
                disabled={loading || cart.length === 0}
                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold transition-all duration-300 group ${
                  loading || cart.length === 0
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-indigo-100 hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Confirm & Place Order
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="mt-8 pt-8 border-t border-slate-50">
                <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed">
                  BY PROCEEDING, YOU AGREE TO OUR <br />
                  <span className="text-indigo-500 cursor-pointer">TERMS OF SERVICE</span> & <span className="text-indigo-500 cursor-pointer">PRIVACY POLICY</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Professional Success Overlay */}
{isSuccess && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
    <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full text-center shadow-2xl scale-in-center animate-in fade-in zoom-in duration-300">
      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
        <CheckCircle className="w-12 h-12 text-emerald-500" strokeWidth={1.5} />
      </div>
      
      <h2 className="text-3xl font-serif text-slate-900 mb-2">Order Confirmed</h2>
      <p className="text-slate-500 font-medium mb-8 leading-relaxed">
        Thank you for your purchase. Your curated selection is being prepared for shipment.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/orders")}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg"
        >
          View My Orders
        </button>
        <button
          onClick={() => navigate("/products")}
          className="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl hover:text-slate-900 transition-all"
        >
          Continue Shopping
        </button>
      </div>
      
      <p className="mt-8 text-[10px] font-black uppercase tracking-widest text-slate-300">
        A confirmation email has been sent to your inbox
      </p>
    </div>
  </div>
)}
    </div>
  );
}