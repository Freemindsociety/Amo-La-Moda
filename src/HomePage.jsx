import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
const Button = ({ children, className }) => (
  <button className={`font-semibold px-4 py-2 rounded ${className}`}>
    {children}
  </button>
);

const products = [
  {
    id: 1,
    name: 'Amo Onesie',
    images: ['/products/amo-onesie-front.jpg', '/products/amo-onesie-back.jpg'],
    price: '$55',
  },
  {
    id: 2,
    name: 'Pink Crewneck',
    images: ['/products/pink-crewneck-front.jpg', '/products/pink-crewneck-back.jpg'],
    price: '$72',
  },
  {
    id: 3,
    name: 'Gradient Crewneck',
    images: ['/products/black-white-gradient-crewneck-front.jpg', '/products/black-white-gradient-crewneck-back.jpg'],
    price: '$75',
  },
  {
    id: 4,
    name: 'White Tee',
    images: ['/products/white-tee-front.jpg', '/products/white-tee-back.jpg'],
    price: '$45',
  },
  {
    id: 5,
    name: 'Dog Hoodie',
    images: ['/products/dog-hoodie-front.jpg', '/products/dog-hoodie-back.jpg'],
    price: '$40',
  },
];

const brandingImages = [
  '/branding/tee-flatlay.jpg',
  '/branding/hoodie-flatlay.jpg',
  '/branding/bag-flatlay.jpg',
];

const lifestyleImages = [
  '/branding/lookbook-1.jpg',
  '/branding/lookbook-2.jpg',
  '/branding/lookbook-3.jpg',
];

export default function HomePage() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-urbanist">
      <motion.header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/60 border-b border-black/10" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <img src="/logo.svg" alt="Amo La Moda Logo" className="h-8 w-auto" />
            <h1 className="text-xl font-playfair tracking-wide">Amo La Moda</h1>
          </motion.div>
          <nav className="hidden md:flex gap-6 text-sm font-semibold">
            {['Shop', 'About', 'Contact', 'Instagram'].map((link) => (
              <motion.a key={link} href="#" className="hover:underline" whileHover={{ scale: 1.1 }}>{link}</motion.a>
            ))}
          </nav>
        </div>
      </motion.header>

      <div className="relative w-full h-screen overflow-hidden pt-20">
        <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" src="/media/hero.mp4" muted autoPlay loop playsInline />
        <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 className="text-4xl md:text-6xl font-playfair mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            Elevated Essentials. Unapologetic Expression.
          </motion.h1>
          <motion.p className="max-w-xl text-lg md:text-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
            Timeless silhouettes. Modern identity. Crafted with intention and made to stand out — because your fit should speak before you do.
          </motion.p>
          <motion.div className="mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <Button className="text-base bg-black text-white hover:bg-neutral-800 px-8 py-3 rounded-full tracking-wide shadow-md">
              Shop the Drop
            </Button>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-4 md:px-12">
        <h2 className="text-2xl font-playfair mb-8 text-center tracking-wide">How It's Worn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lifestyleImages.map((src, i) => (
            <img key={i} src={src} alt={`Lifestyle ${i + 1}`} className="w-full h-[400px] object-cover rounded-2xl shadow" />
          ))}
        </div>
      </section>

      <section className="py-24 px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandingImages.map((src, index) => (
            <motion.div key={index} className="overflow-hidden" whileHover={{ scale: 1.02 }}>
              <img src={src} alt={`Branding ${index + 1}`} className="w-full h-[500px] object-cover object-center" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-4 md:px-12">
        <div className="text-center mb-6">
          <p className="text-sm uppercase tracking-widest text-neutral-500">Drop 01 — Live Now</p>
        </div>
        <h2 className="text-3xl font-playfair mb-12 tracking-wide text-center">Featured Looks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16">
          {products.map((product) => (
            <motion.div key={product.id} className="group cursor-pointer" whileHover={{ scale: 1.03 }}>
              <div className="w-full overflow-hidden relative transition-transform duration-500 group-hover:scale-105">
                <img src={product.images[0]} alt={product.name} className="w-full h-[600px] object-cover object-center transition-opacity duration-300 group-hover:opacity-0" />
                <img src={product.images[1]} alt={`${product.name} Back`} className="absolute top-0 left-0 w-full h-[600px] object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end justify-center p-4 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-semibold uppercase tracking-wider">Tap to view</p>
                </div>
              </div>
              <div className="mt-4 text-left">
                <h3 className="text-lg font-medium tracking-wide font-playfair">{product.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-black/10 py-10 px-4 md:px-12 text-black">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-2">Amo La Moda</h4>
            <p>Made with love. Rooted in Pine Hills. Worn worldwide.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Shop</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Stay Laced</h4>
            <form className="flex flex-col space-y-2">
              <input type="email" placeholder="Your email" className="bg-neutral-100 text-black px-4 py-2 rounded-xl" />
              <Button className="bg-black text-white hover:bg-neutral-800">Keep Me Laced</Button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
