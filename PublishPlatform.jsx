import { useState, useEffect, useRef } from "react";

const categories = ["All", "Technology", "Culture", "Science", "Politics", "Business", "Design"];

const featured = {
  id: 0,
  tag: "Cover Story",
  tagColor: "#E85D26",
  title: "The Quiet Revolution Reshaping How We Think About Intelligence",
  excerpt:
    "Beneath the noise of chatbots and viral demos lies a deeper transformation — one that's rewiring research labs, hospital wards, and the very grammar of human thought.",
  author: "Priya Mehta",
  role: "Senior Correspondent",
  readTime: "14 min read",
  date: "May 25, 2026",
  category: "Technology",
  gradient: "from-[#0D0D0D] via-[#1a1209] to-[#0D0D0D]",
  accentColor: "#F5A623",
};

const articles = [
  {
    id: 1,
    tag: "Science",
    title: "The Hidden Ocean That Might Harbor Life",
    excerpt: "Europa's subsurface seas are stranger — and more promising — than anyone expected.",
    author: "James Okoye",
    readTime: "8 min",
    date: "May 24",
    size: "large",
    accent: "#3B82F6",
  },
  {
    id: 2,
    tag: "Culture",
    title: "Why the New Slow Food Movement Is Going Faster Than Ever",
    excerpt: "Counter-intuitively, the return to artisanal cooking is being turbocharged by logistics tech.",
    author: "Amara Diallo",
    readTime: "5 min",
    date: "May 24",
    size: "small",
    accent: "#10B981",
  },
  {
    id: 3,
    tag: "Design",
    title: "The Architects Who Build Cities No One Will Live In",
    excerpt: "Speculative urbanism has become the most provocative art form of the decade.",
    author: "Lena Brandt",
    readTime: "6 min",
    date: "May 23",
    size: "small",
    accent: "#8B5CF6",
  },
  {
    id: 4,
    tag: "Politics",
    title: "Governing the Ungovernable: How Small Nations Are Winning",
    excerpt: "A new playbook is emerging from the edges of global power.",
    author: "Carlos Vega",
    readTime: "10 min",
    date: "May 23",
    size: "medium",
    accent: "#EC4899",
  },
  {
    id: 5,
    tag: "Business",
    title: "The Founder Who Sold Her Startup Three Times",
    excerpt: "Serial exits aren't about exits. They're about building the muscle to start again.",
    author: "Sofia Chen",
    readTime: "7 min",
    date: "May 22",
    size: "medium",
    accent: "#F59E0B",
  },
  {
    id: 6,
    tag: "Technology",
    title: "Open Source Won. Now What?",
    excerpt: "The movement that beat the giants now has to govern itself.",
    author: "Dev Anand",
    readTime: "9 min",
    date: "May 22",
    size: "small",
    accent: "#06B6D4",
  },
  {
    id: 7,
    tag: "Culture",
    title: "The Last Record Store and Why It Matters",
    excerpt: "In an age of infinite streaming, scarcity has become the ultimate luxury.",
    author: "Nia Osei",
    readTime: "4 min",
    date: "May 21",
    size: "small",
    accent: "#E85D26",
  },
  {
    id: 8,
    tag: "Science",
    title: "Reprogramming Memory, One Synapse at a Time",
    excerpt: "New optogenetic techniques could let us selectively dim traumatic recall.",
    author: "Rashid Kaur",
    readTime: "11 min",
    date: "May 21",
    size: "large",
    accent: "#7C3AED",
  },
];

const trending = [
  { rank: "01", title: "The Company That Owns Your Morning Routine", tag: "Business" },
  { rank: "02", title: "Inside the Lab Editing Wild Animal DNA", tag: "Science" },
  { rank: "03", title: "What Happened to the Promise of the Metaverse?", tag: "Technology" },
  { rank: "04", title: "A Field Guide to the New Global Right", tag: "Politics" },
  { rank: "05", title: "The Return of the 15-Minute City", tag: "Design" },
];

const tagColors = {
  Technology: { bg: "#EFF6FF", text: "#1D4ED8" },
  Culture: { bg: "#FDF4FF", text: "#7E22CE" },
  Science: { bg: "#F0FDF4", text: "#15803D" },
  Politics: { bg: "#FFF1F2", text: "#BE123C" },
  Business: { bg: "#FFFBEB", text: "#B45309" },
  Design: { bg: "#F5F3FF", text: "#6D28D9" },
};

function Tag({ label, accent }) {
  const colors = tagColors[label] || { bg: "#F3F4F6", text: "#374151" };
  return (
    <span
      style={{ background: colors.bg, color: colors.text }}
      className="inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
    >
      {label}
    </span>
  );
}

function Avatar({ name, role, dark = false }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #E85D26, #F5A623)" }}
      >
        {initials}
      </div>
      <div>
        <p className={`text-[13px] font-semibold leading-none ${dark ? "text-white/90" : "text-gray-900"}`}>{name}</p>
        {role && <p className="text-[11px] text-white/50 mt-0.5">{role}</p>}
      </div>
    </div>
  );
}

function ArticleCard({ article, index }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = article.size === "large";
  const isMedium = article.size === "medium";

  return (
    <div
      className={`group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-300 ${
        isLarge ? "col-span-2 row-span-2" : isMedium ? "col-span-2" : "col-span-1"
      }`}
      style={{
        background: hovered ? "#FAFAFA" : "#FFFFFF",
        border: `1px solid ${hovered ? "#E5E7EB" : "#F0F0F0"}`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px -10px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isLarge && (
        <div
          className="w-full overflow-hidden"
          style={{ height: "200px", background: `linear-gradient(135deg, ${article.accent}15, ${article.accent}30)` }}
        >
          <div
            className="w-full h-full flex items-center justify-center opacity-20"
            style={{ fontSize: "120px", filter: "blur(0px)" }}
          >
            {article.tag === "Science" ? "🔭" : article.tag === "Design" ? "🏙️" : "✦"}
          </div>
          <div
            className="absolute top-0 left-0 w-full h-[200px] opacity-40"
            style={{ background: `linear-gradient(to bottom, transparent, white)` }}
          />
        </div>
      )}

      <div className={`p-6 ${isLarge ? "pt-4" : ""}`}>
        <div className="flex items-center justify-between mb-3">
          <Tag label={article.tag} />
          <span className="text-[11px] text-gray-400">{article.readTime}</span>
        </div>

        <h3
          className={`font-bold leading-tight text-gray-900 mb-2 ${isLarge ? "text-2xl" : isMedium ? "text-lg" : "text-base"}`}
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" }}
        >
          {article.title}
        </h3>

        {(isLarge || isMedium) && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
              style={{ background: article.accent }}
            >
              {article.author[0]}
            </div>
            <span className="text-[12px] text-gray-500 font-medium">{article.author}</span>
          </div>
          <span className="text-[11px] text-gray-400">{article.date}</span>
        </div>
      </div>
    </div>
  );
}

function TrendingItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-start gap-4 py-4 cursor-pointer group"
      style={{ borderBottom: "1px solid #F3F4F6" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="text-[13px] font-bold flex-shrink-0 mt-0.5 transition-colors"
        style={{ color: hovered ? "#E85D26" : "#D1D5DB", fontVariantNumeric: "tabular-nums" }}
      >
        {item.rank}
      </span>
      <div className="flex-1 min-w-0">
        <Tag label={item.tag} />
        <p
          className="text-[14px] font-semibold text-gray-800 mt-2 leading-snug transition-colors"
          style={{
            fontFamily: "'Georgia', serif",
            color: hovered ? "#111827" : "#374151",
          }}
        >
          {item.title}
        </p>
      </div>
      <span
        className="text-gray-300 mt-1 flex-shrink-0 transition-all"
        style={{
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}
      >
        →
      </span>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.tag === activeCategory);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Top bar */}
      <div className="w-full text-center py-2 text-[11px] font-semibold tracking-widest uppercase text-white" style={{ background: "#E85D26" }}>
        ✦ Now Reading: The Quiet Revolution — Cover Story May 2026 ✦
      </div>

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "white",
          borderBottom: scrolled ? "1px solid #F3F4F6" : "1px solid #F9FAFB",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
                style={{ background: "#0D0D0D" }}
              >
                M
              </div>
              <span className="text-[20px] font-black tracking-tight text-gray-900" style={{ letterSpacing: "-0.04em" }}>
                MERIDIAN
              </span>
            </a>

            {/* Nav links */}
            <div className="hidden lg:flex items-center gap-6">
              {["Discover", "Long Reads", "Podcast", "Archive"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </button>
            <button
              className="text-white text-[13px] font-bold px-5 py-2 rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#E85D26" }}
            >
              Subscribe
            </button>
            <button className="lg:hidden text-gray-700 ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 px-6 py-4 space-y-3">
            {["Discover", "Long Reads", "Podcast", "Archive"].map((link) => (
              <a key={link} href="#" className="block text-[14px] font-medium text-gray-700">{link}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO / FEATURED STORY ─── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: "#0D0D0D", minHeight: "82vh" }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232,93,38,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-28 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span
                className="text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full"
                style={{ background: "#E85D26", color: "white" }}
              >
                {featured.tag}
              </span>
              <span className="text-white/30 text-[11px] tracking-widest">{featured.date}</span>
            </div>

            <h1
              className="text-white font-black leading-[1.04] mb-6"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {featured.title}
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              {featured.excerpt}
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <Avatar name={featured.author} role={featured.role} dark={true} />
              <span className="text-white/30 hidden sm:block">·</span>
              <span className="text-white/40 text-[13px]">{featured.readTime}</span>
              <button
                className="flex items-center gap-2 text-white font-bold text-[14px] px-7 py-3.5 rounded-full transition-all hover:opacity-90 active:scale-95"
                style={{ background: "#E85D26" }}
              >
                Read Story
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: decorative visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                width: "420px",
                height: "480px",
                background: "linear-gradient(145deg, #1a1a1a, #111)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Abstract data art */}
              <svg viewBox="0 0 420 480" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E85D26" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#E85D26" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F5A623" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="290" cy="160" r="140" fill="url(#glow1)" />
                <circle cx="140" cy="340" r="100" fill="url(#glow2)" />
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1={60 + i * 50}
                    y1="40"
                    x2={20 + i * 60}
                    y2="440"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="1"
                  />
                ))}
                {[40, 120, 200, 280, 360, 440].map((y, i) => (
                  <line key={i} x1="0" y1={y} x2="420" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                ))}
                <circle cx="210" cy="200" r="80" fill="none" stroke="rgba(232,93,38,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
                <circle cx="210" cy="200" r="120" fill="none" stroke="rgba(232,93,38,0.1)" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="210" cy="200" r="14" fill="#E85D26" opacity="0.9" />
                <circle cx="290" cy="130" r="7" fill="#F5A623" opacity="0.8" />
                <circle cx="140" cy="280" r="5" fill="#F5A623" opacity="0.6" />
                <circle cx="310" cy="280" r="4" fill="rgba(255,255,255,0.4)" />
                <circle cx="100" cy="160" r="3" fill="rgba(255,255,255,0.3)" />
                <text x="60" y="390" fill="rgba(255,255,255,0.12)" fontSize="11" fontFamily="monospace" letterSpacing="2">INTELLIGENCE · 2026</text>
                <text x="60" y="410" fill="rgba(255,255,255,0.08)" fontSize="10" fontFamily="monospace">MERIDIAN / COVER STORY</text>
              </svg>

              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}>
                <p className="text-white/80 text-[13px] leading-relaxed" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                  "The question is no longer whether machines can think — it's whether we understand what thinking means."
                </p>
                <p className="text-white/30 text-[11px] mt-2">— Priya Mehta, Meridian</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY PILLS ─── */}
      <div className="sticky top-[65px] z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 text-[12px] font-semibold tracking-wide px-4 py-2 rounded-full transition-all"
              style={{
                background: activeCategory === cat ? "#0D0D0D" : "#F3F4F6",
                color: activeCategory === cat ? "white" : "#6B7280",
                transform: activeCategory === cat ? "scale(1.02)" : "scale(1)",
              }}
            >
              {cat}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-[11px] text-gray-400 flex-shrink-0 hidden sm:block">
            {filteredArticles.length} stories
          </span>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* Article grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[13px] font-black tracking-widest uppercase text-gray-400">
                {activeCategory === "All" ? "Latest Stories" : activeCategory}
              </h2>
              <button className="text-[12px] font-semibold text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1">
                View all
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
              {filteredArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>

            {/* Newsletter banner */}
            <div
              className="mt-12 rounded-3xl p-8 relative overflow-hidden"
              style={{ background: "#0D0D0D" }}
            >
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(232,93,38,0.25) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
              />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <p className="text-[11px] font-black tracking-widest uppercase text-white/30 mb-2">Weekly Dispatch</p>
                  <h3 className="text-white font-black text-2xl leading-tight mb-1" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                    Ideas that move the world.
                  </h3>
                  <p className="text-white/50 text-sm">Join 280,000 curious minds. No noise, just signal.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="rounded-2xl px-5 py-3 text-[13px] outline-none border-none w-full sm:w-56"
                    style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
                  />
                  <button
                    className="rounded-2xl px-6 py-3 text-[13px] font-bold text-white flex-shrink-0 hover:opacity-90 transition-opacity"
                    style={{ background: "#E85D26" }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">

            {/* Trending */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 rounded-full" style={{ background: "#E85D26" }} />
                <h2 className="text-[13px] font-black tracking-widest uppercase text-gray-400">Trending Now</h2>
              </div>
              <div>
                {trending.map((item, i) => (
                  <TrendingItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #F3F4F6" }} />

            {/* Editors' Picks */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 rounded-full" style={{ background: "#7C3AED" }} />
                <h2 className="text-[13px] font-black tracking-widest uppercase text-gray-400">Editors' Picks</h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "The Loneliness Epidemic Isn't What You Think", tag: "Culture", time: "12 min" },
                  { title: "Carbon Markets Are Broken. Here's the Fix.", tag: "Science", time: "9 min" },
                  { title: "Inside the World's Most Secretive Hedge Fund", tag: "Business", time: "15 min" },
                ].map((pick, i) => (
                  <div
                    key={i}
                    className="flex gap-3 cursor-pointer group p-3 rounded-2xl transition-colors hover:bg-gray-50"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black text-white/20"
                      style={{ background: ["#1a1209", "#0a1a10", "#1a1009"][i] }}
                    >
                      {["✦", "◆", "●"][i]}
                    </div>
                    <div>
                      <Tag label={pick.tag} />
                      <p
                        className="text-[13px] font-semibold text-gray-800 mt-1.5 leading-snug group-hover:text-gray-900"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {pick.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">{pick.time} read</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff picks quote */}
            <div
              className="rounded-3xl p-6"
              style={{ background: "#FFF7F3", border: "1px solid #FCE8E0" }}
            >
              <p className="text-[12px] font-black tracking-widest uppercase mb-3" style={{ color: "#E85D26" }}>From the Editor</p>
              <p
                className="text-gray-800 text-[15px] leading-relaxed"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                "Every issue, we chase the story beneath the story. This month, we went deep on intelligence — not the artificial kind, but the human kind that makes sense of it."
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: "#E85D26" }}
                >
                  EI
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-900">Elena Ivanović</p>
                  <p className="text-[11px] text-gray-400">Editor-in-Chief</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#0D0D0D", borderTop: "1px solid #1a1a1a" }} className="mt-16">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
                style={{ background: "#E85D26" }}
              >
                M
              </div>
              <span className="text-white font-black text-lg tracking-tight" style={{ letterSpacing: "-0.04em" }}>MERIDIAN</span>
            </div>
            <p className="text-white/40 text-[13px] leading-relaxed">
              Independent journalism for a world that doesn't slow down.
            </p>
          </div>
          {[
            { title: "Sections", links: ["Technology", "Culture", "Science", "Politics", "Business"] },
            { title: "Company", links: ["About", "Careers", "Press", "Advertise", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookie Policy", "Accessibility"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-black tracking-widest uppercase text-white/30 mb-4">{col.title}</p>
              <div className="space-y-2">
                {col.links.map((link) => (
                  <a key={link} href="#" className="block text-[13px] text-white/50 hover:text-white/80 transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-white/25 text-[12px]">© 2026 Meridian Publishing. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Twitter", "Instagram", "LinkedIn", "RSS"].map((s) => (
              <a key={s} href="#" className="text-white/30 text-[12px] hover:text-white/60 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
