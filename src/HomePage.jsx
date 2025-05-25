"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Button = ({ children, className = "" }) => (
  <button className="font-semibold px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300 text-sm tracking-wide hover:scale-105 hover:shadow-lg">
    {children}
  </button>
)

// Simple SVG Icons
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const ShoppingBagIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
    />
  </svg>
)

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const HeartIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const DropCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 18 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-white bg-black/50 backdrop-blur-md px-6 sm:px-8 py-6 rounded-xl border border-white/20 shadow-2xl w-full max-w-sm sm:max-w-none">
      <span className="text-xs uppercase tracking-[0.4em] font-light text-center sm:text-left">NEXT DROP</span>
      <div className="flex gap-4 sm:gap-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="text-xl sm:text-3xl md:text-4xl font-light tabular-nums">
              {value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs uppercase tracking-[0.3em] font-light opacity-80">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const StickySignupBar = () => {
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBar(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-4 right-4 mx-auto bg-white text-black border border-gray-200 shadow-lg rounded-full flex items-center px-4 py-3 space-x-3 z-50 max-w-sm"
        >
          <input
            type="email"
            placeholder="Enter email"
            className="flex-1 text-sm bg-transparent outline-none placeholder-gray-500 min-w-0"
          />
          <button className="font-semibold px-4 py-2 rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300 text-xs tracking-wide hover:scale-105 hover:shadow-lg whitespace-nowrap">
            Join
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const SearchBar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-black/10 p-6 shadow-lg"
        >
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full text-lg font-light tracking-wide bg-transparent border-b border-black/20 pb-3 outline-none focus:border-black transition-colors"
              autoFocus
            />
            <SearchIcon className="absolute right-0 top-0 w-5 h-5 text-black/40" />
          </div>
          <div className="max-w-2xl mx-auto mt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-3">TRENDING SEARCHES</p>
            <div className="flex flex-wrap gap-2">
              {["Hoodies", "Crewnecks", "Tees", "Limited Edition"].map((term) => (
                <button
                  key={term}
                  className="text-sm font-light tracking-wide px-3 py-1 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const MobileSearchOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-black/10">
            <h2 className="text-sm font-light tracking-[0.3em] uppercase">SEARCH</h2>
            <button onClick={onClose} className="text-sm font-light tracking-[0.3em] uppercase">
              CLOSE
            </button>
          </div>
          <div className="flex-1 p-6">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full text-lg font-light tracking-wide bg-transparent border-b border-black/20 pb-3 outline-none focus:border-black transition-colors"
                autoFocus
              />
              <SearchIcon className="absolute right-0 top-0 w-5 h-5 text-black/40" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-3">TRENDING SEARCHES</p>
              <div className="flex flex-wrap gap-2">
                {["Hoodies", "Crewnecks", "Tees", "Limited Edition"].map((term) => (
                  <button
                    key={term}
                    className="text-sm font-light tracking-wide px-3 py-2 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const products = [
  {
    id: 1,
    name: "Amo Onesie",
    collection: "CORE",
    images: ["/products/amo-onesie-front.jpg", "/products/amo-onesie-back.jpg"],
    price: "$55",
    stock: "3 LEFT",
  },
  {
    id: 2,
    name: "Pink Crewneck",
    collection: "CORE",
    images: ["/products/pink-crewneck-front.jpg", "/products/pink-crewneck-back.jpg"],
    price: "$72",
    stock: "SOLD OUT",
  },
  {
    id: 3,
    name: "Gradient Crewneck",
    collection: "LIMITED",
    images: ["/products/black-white-gradient-crewneck-front.jpg", "/products/black-white-gradient-crewneck-back.jpg"],
    price: "$75",
    stock: "1 LEFT",
  },
  {
    id: 4,
    name: "White Tee",
    collection: "CORE",
    images: ["/products/white-tee-front.jpg", "/products/white-tee-back.jpg"],
    price: "$45",
    stock: "IN STOCK",
  },
  {
    id: 5,
    name: "Dog Hoodie",
    collection: "PAW PRINT",
    images: ["/products/dog-hoodie-front.jpg", "/products/dog-hoodie-back.jpg"],
    price: "$40",
    stock: "5 LEFT",
  },
]

export default function HomePage() {
  const videoRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [rotatedProducts, setRotatedProducts] = useState(new Set())
  const [cartCount, setCartCount] = useState(3)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleRotateClick = (index, e) => {
    e.stopPropagation()
    setRotatedProducts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono overflow-x-hidden antialiased">
      {/* Elevated Header */}
      <motion.header
        className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-black/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
            <img src="/logo.svg" alt="Amo La Moda Logo" className="h-10 w-auto" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 text-xs font-light tracking-[0.3em] uppercase">
            {["MEN", "WOMEN", "PAW PRINT", "ABOUT", "CONTACT"].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="relative group py-3 px-2 hover:text-black/60 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                <span className="relative z-10">{link}</span>
                <motion.div
                  className="absolute bottom-2 left-0 w-full h-px bg-black origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <SearchIcon />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <HeartIcon />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <UserIcon />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingBagIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-light">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <SearchIcon />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingBagIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-light">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-6 h-6 hover:scale-110 transition-transform ml-1"
            >
              <motion.span
                className="block w-5 h-px bg-black mb-1"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-5 h-px bg-black mb-1"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-5 h-px bg-black"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </motion.header>

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay isOpen={mobileSearchOpen} onClose={() => setMobileSearchOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 flex flex-col"
            >
              {/* Optional mini video background */}
              <div className="absolute inset-0 opacity-10">
                <video className="w-full h-full object-cover" src="/media/hero.mp4" muted autoPlay loop playsInline />
              </div>

              {/* Menu Header */}
              <div className="relative z-10 flex justify-between items-center p-8 border-b border-black/10">
                <img src="/logo.svg" alt="Amo La Moda Logo" className="h-8 w-auto" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-light tracking-[0.4em] uppercase hover:scale-110 transition-transform"
                >
                  CLOSE
                </button>
              </div>

              {/* Menu Content */}
              <div className="relative z-10 flex-1 flex flex-col justify-center px-8">
                <nav className="space-y-8">
                  {["MEN", "WOMEN", "PAW PRINT", "ABOUT", "CONTACT"].map((link, index) => (
                    <motion.div
                      key={link}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="text-center"
                    >
                      <a
                        href="#"
                        className="block text-4xl md:text-5xl font-light tracking-[0.1em] uppercase py-4 hover:text-black/60 transition-all duration-500 antialiased"
                        style={{ fontFamily: "Playfair Display, serif" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link}
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Secondary Actions */}
                <motion.div
                  className="mt-16 pt-8 border-t border-black/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex justify-center gap-12">
                    <button className="flex flex-col items-center gap-3 p-4 hover:bg-black/5 rounded-xl transition-colors">
                      <HeartIcon className="w-6 h-6" />
                      <span className="text-sm font-light tracking-[0.2em] uppercase">Wishlist</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 hover:bg-black/5 rounded-xl transition-colors">
                      <UserIcon className="w-6 h-6" />
                      <span className="text-sm font-light tracking-[0.2em] uppercase">Account</span>
                    </button>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Button>SHOP DROP 01</Button>
                </motion.div>
              </div>

              {/* Menu Footer */}
              <motion.div
                className="relative z-10 p-8 border-t border-black/10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-xs font-light opacity-60 leading-relaxed tracking-wide">
                  Made with love. Rooted in Pine Hills. Worn worldwide.
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section - More Editorial */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/media/hero.mp4"
          muted
          autoPlay
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12">
          <div className="max-w-4xl text-center">
            <motion.div
              className="mb-12 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <DropCountdown />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight text-white drop-shadow-lg subpixel-antialiased"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span
                className="font-light"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                ELEVATED
              </motion.span>
              <br />
              <motion.span
                className="font-normal"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                ESSENTIALS
              </motion.span>
            </motion.h1>

            <motion.p
              className="max-w-xl mx-auto text-lg md:text-xl lg:text-2xl font-light leading-relaxed md:leading-loose text-white drop-shadow-md mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Unapologetic expression through timeless silhouettes.
              <br />
              Made for those who understand that luxury lives in the details.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <button className="font-semibold px-8 py-4 rounded-full bg-gradient-to-r from-zinc-900 to-neutral-800 text-white hover:from-black hover:to-zinc-900 transition-all duration-300 text-sm tracking-wide hover:scale-105 hover:shadow-2xl ring-offset-2 focus:ring-2 focus:ring-white/50 active:scale-95">
                SHOP DROP 01
              </button>
              <button className="font-semibold px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-all duration-300 text-sm tracking-wide hover:scale-105 hover:shadow-xl ring-offset-2 focus:ring-2 focus:ring-white/50 active:scale-95">
                VIEW LOOKBOOK
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Product Showcase */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">DROP 01 — LIVE NOW</p>
            <h2 className="text-4xl md:text-6xl font-thin tracking-tight">
              FEATURED
              <br />
              <span className="font-black">PIECES</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="group cursor-pointer relative"
                onMouseEnter={() => setHoveredProduct(index)}
                onMouseLeave={() => setHoveredProduct(null)}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full overflow-hidden relative aspect-[3/4] rounded-lg shadow-md bg-gray-50">
                  <motion.img
                    src={rotatedProducts.has(index) ? product.images[1] : product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg transition-all duration-500"
                    animate={{ scale: hoveredProduct === index ? 1.05 : 1 }}
                  />

                  {/* Stock Indicator */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs uppercase tracking-wider px-2 py-1 rounded ${
                        product.stock === "SOLD OUT"
                          ? "bg-black text-white"
                          : product.stock.includes("LEFT")
                            ? "bg-red-500 text-white"
                            : "bg-white text-black"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </div>

                  {/* Collection Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-xs uppercase tracking-wider bg-white/90 text-black px-2 py-1 rounded">
                      {product.collection}
                    </span>
                  </div>

                  {/* Rotate Button */}
                  <button
                    onClick={(e) => handleRotateClick(index, e)}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-black p-2 rounded-full transition-all duration-200 hover:scale-110"
                    title={rotatedProducts.has(index) ? "Show front" : "Show back"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-3 text-left">
                  <h3 className="text-base md:text-lg font-medium tracking-wide">{product.name}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h4 className="font-medium text-base md:text-lg mb-3 tracking-wide">AMO LA MODA</h4>
              <p className="text-lg font-light leading-relaxed mb-4 opacity-90">
                Made for the streets. From Pine Hills to the world. Every piece tells a story of authenticity, crafted
                for those who refuse to blend in.
              </p>
              <p className="font-light leading-relaxed opacity-80">
                Made with love. Rooted in Pine Hills. Worn worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] font-light mb-6">QUICK LINKS</h4>
              <ul className="space-y-3 font-light">
                {["Shop", "About", "Contact", "Size Guide", "Returns"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors duration-300 uppercase tracking-wide text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] font-light mb-6">CONNECT</h4>
              <ul className="space-y-3 font-light">
                {["Instagram", "TikTok", "Newsletter"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors duration-300 uppercase tracking-wide text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] font-light opacity-60">
              © 2024 AMO LA MODA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      <StickySignupBar />
    </div>
  )
}
