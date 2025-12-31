import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, Truck, Shield, Star, 
  Sparkles, ArrowRight, Heart, 
  Globe, Instagram, ChevronRight,
  PlayCircle, Leaf, Gem, Clock
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const categories = [
    { title: "Educational", slug: "Educational Toy", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80", tag: "Mindful Development" },
    { title: "Outdoor", slug: "Outdoor", image: "https://images.pexels.com/photos/6557749/pexels-photo-6557749.jpeg", tag: "Infinite Exploration" },
    { title: "Action", slug: "Action", image: "https://images.pexels.com/photos/15964921/pexels-photo-15964921.jpeg", tag: "Heroic Journeys" },
    { title: "Vehicles", slug: "Vehicle", image: "https://images.pexels.com/photos/8568869/pexels-photo-8568869.jpeg", tag: "Precision Motion" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-indigo-50/30 to-white" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-100/10 to-rose-100/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 px-4 py-2 rounded-full">
                <Leaf className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600">Established 2010</span>
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-indigo-600/20 to-transparent"></div>
            </div>
            
            <h1 className="text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif leading-[0.9] mb-10 tracking-tight">
              Curating <br />
              <span className="relative">
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900">Wonder.</span>
                <div className="absolute -bottom-4 left-0 w-48 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-xl leading-relaxed mb-14 font-light tracking-wide">
              We believe toys should be heirlooms, not disposables. Discover our curated collection of artisanal playthings crafted for the modern imagination.
            </p>
            
            <div className="flex items-center gap-8">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/products")}
                className="group relative px-12 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl overflow-hidden transition-all shadow-2xl shadow-slate-300/50 hover:shadow-3xl hover:shadow-indigo-300/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 font-bold flex items-center gap-3 text-lg tracking-wide">
                  Shop the Collection 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>
          </motion.div>

          <div className="lg:w-1/2 relative h-[600px] w-full">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-[85%] h-[500px] rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-400/30 z-20 border-8 border-white"
            >
              <img 
                src="img2.jpg" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]" 
                alt="Luxury Wooden Toys"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-8 left-0 w-[55%] h-[320px] rounded-[3rem] overflow-hidden border-[14px] border-white shadow-2xl z-30 hidden lg:block"
            >
              <img 
                src="img1.jpg" 
                className="w-full h-full object-cover" 
                alt="Detail view"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-xs font-bold text-slate-900">Artisanal Craft</span>
              </div>
            </motion.div>
            
            {/* Floating Badge */}
            <div className="absolute top-20 -left-4 bg-gradient-to-br from-white to-slate-50 p-6 rounded-3xl shadow-2xl shadow-slate-300/50 z-40 hidden lg:block">
              <Gem className="w-8 h-8 text-indigo-600 mb-3" />
              <div className="text-2xl font-serif italic">500+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Craft Families</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <section className="bg-gradient-to-r from-white via-indigo-50/20 to-white py-16 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            {[
              { icon: Leaf, text: "Sustainability First", color: "text-emerald-600" },
              { icon: Truck, text: "Global Logistics", color: "text-blue-600" },
              { icon: Shield, text: "Eco-Certified", color: "text-amber-600" },
              { icon: Star, text: "Award Winning", color: "text-purple-600" },
              { icon: Clock, text: "Handmade Craft", color: "text-rose-600" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className={`mb-4 p-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-lg group-hover:shadow-xl transition-all duration-500 ${item.color.replace('text', 'group-hover:bg')} group-hover:scale-110`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold tracking-wide text-slate-700 group-hover:text-slate-900 transition-colors">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COLLECTIONS GRID --- */}
      <section className="py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-indigo-600">Discovery</span>
            </div>
            <h3 className="text-6xl lg:text-7xl font-serif leading-tight tracking-tight">
              Masterfully Crafted <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                Developmental Archives.
              </span>
            </h3>
          </div>
          <button 
            onClick={() => navigate("/products")}
            className="group flex items-center gap-3 pb-2 border-b-2 border-slate-900 hover:border-indigo-600 transition-all"
          >
            <span className="font-bold text-sm uppercase tracking-widest text-slate-900 group-hover:text-indigo-600 transition-colors">
              View All Categories
            </span>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -16 }}
              onClick={() => navigate(`/products?category=${encodeURIComponent(category.slug)}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 mb-8 shadow-lg shadow-slate-200/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-200/30">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 via-slate-900/0 to-slate-900/20 z-10" />
                <img
                  src={category.image}
                  className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-110"
                  alt={category.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-xs font-bold text-slate-900">{category.tag}</span>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 z-20">
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <div>
                      <span className="text-white font-medium text-lg">{category.title}</span>
                      <span className="block text-white/70 text-sm mt-1">Explore Collection</span>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <h4 className="text-2xl font-bold mb-2 group-hover:text-indigo-700 transition-colors duration-300">{category.title}</h4>
                <p className="text-sm font-medium text-slate-500 tracking-wide">{category.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- EDITORIAL FEATURE --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-slate-400/10">
            <div className="lg:w-1/2 p-12 lg:p-20 xl:p-24 flex flex-col justify-center relative">
              <div className="absolute top-12 left-12 w-32 h-32 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              <Sparkles className="text-indigo-400 w-14 h-14 mb-10 relative z-10" />
              <h2 className="text-white text-5xl lg:text-6xl font-serif mb-10 leading-tight relative z-10">
                The Art of <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                  Mindful Parenting.
                </span>
              </h2>
              <p className="text-slate-700 text-lg mb-14 leading-relaxed tracking-wide relative z-10">
                Our Journal explores the intersections of play, design, and child development. 
                Subscribe to receive our seasonal curation of insights and inspirations.
              </p>
            </div>
            <div className="lg:w-1/2 h-[500px] lg:h-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-transparent z-10"></div>
              <img 
                src="https://images.pexels.com/photos/3662839/pexels-photo-3662839.jpeg" 
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[1.5s]"
                alt="Editorial"
              />
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hidden lg:block">
                <div className="text-white text-sm">Featured Story</div>
                <div className="text-white font-serif text-xl">The Language of Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gradient-to-b from-white to-slate-50 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-20 mb-28">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur group-hover:blur-md transition-all"></div>
                  <div className="relative w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center rotate-3 group hover:rotate-0 transition-transform duration-500">
                    <span className="text-white font-serif text-3xl italic">P</span>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-serif tracking-tighter font-bold uppercase">Playora</span>
                  <div className="h-px w-16 bg-gradient-to-r from-indigo-600 to-purple-600 mt-2"></div>
                </div>
              </div>
              <p className="text-slate-500 font-light tracking-wide leading-relaxed mb-10 max-w-md">
                Crafting the future of childhood through sustainable design and artisanal craftsmanship. 
                Where every piece tells a story.
              </p>
              <div className="flex gap-4">
                {[Instagram, Globe, Heart].map((Icon, i) => (
                  <button key={i} className="group relative w-12 h-12 rounded-full overflow-hidden transition-all hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-black transition-colors border border-slate-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "Boutique", links: ["All Products", "New Drops", "Sustainable Sets", "Gift Cards", "Limited Editions"] },
              { title: "Experience", links: ["Our Story", "The Atelier", "Sustainability", "Journal", "Events"] },
              { title: "Support", links: ["Delivery", "Returns", "Size Guide", "Care Instructions", "Contact"] }
            ].map((col) => (
              <div key={col.title}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-900">{col.title}</h5>
                </div>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="group flex items-center gap-2 text-sm text-slate-500 font-light hover:text-slate-900 transition-colors">
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-100 gap-6">
            <p className="text-xs font-bold tracking-widest text-slate-400">
              © 2025 Playora Atelier Inc. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="group text-xs font-bold tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                <span className="h-px w-4 bg-transparent group-hover:bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"></span>
                Privacy
              </a>
              <a href="#" className="group text-xs font-bold tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                <span className="h-px w-4 bg-transparent group-hover:bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"></span>
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}