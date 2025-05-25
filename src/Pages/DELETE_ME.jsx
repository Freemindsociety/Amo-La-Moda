import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

const sizes = ['S', 'M', 'L', 'XL'];

const products = [
  {
    id: 1,
    name: 'Amo Onesie',
    slug: 'amo-onesie',
    images: ['/products/amo-onesie-front.jpg', '/products/amo-onesie-back.jpg'],
    price: '$55',
    description: 'Inspired by cozy days and stylish comfort, the Amo Onesie is our ode to relaxation with refinement. Its soft cotton blend offers all-day lounge appeal while still carrying a modern silhouette that embodies elevated essentials.',
  },
  {
    id: 2,
    name: 'Pink Crewneck',
    slug: 'pink-crewneck',
    images: ['/products/pink-crewneck-front.jpg', '/products/pink-crewneck-back.jpg'],
    price: '$72',
    description: 'The Pink Crewneck is a statement of subtle confidence. Inspired by vintage hues and West Coast cool, it features a bold oversized shape and a washed-rosé tone that brings softness to strength.',
  },
  {
    id: 3,
    name: 'Gradient Crewneck',
    slug: 'gradient-crewneck',
    images: ['/products/black-white-gradient-crewneck-front.jpg', '/products/black-white-gradient-crewneck-back.jpg'],
    price: '$75',
    description: 'This piece represents balance — bold yet minimal. The Gradient Crewneck takes cues from monochrome palettes and streetwear’s edge. It’s the anchor of our drop, symbolizing progression and personal evolution.',
  },
  {
    id: 4,
    name: 'White Tee',
    slug: 'white-tee',
    images: ['/products/white-tee-front.jpg', '/products/white-tee-back.jpg'],
    price: '$45',
    description: 'Simplicity at its finest. The Amo White Tee is the everyday staple we elevated — thick cotton, perfect drape, clean neckline. Inspired by 90s minimalism with a tailored edge.',
  },
  {
    id: 5,
    name: 'Dog Hoodie',
    slug: 'dog-hoodie',
    images: ['/products/dog-hoodie-front.jpg', '/products/dog-hoodie-back.jpg'],
    price: '$40',
    description: 'For the furry fashion lover. Our dog hoodie is made with the same care and custom edge as our human pieces. Inspired by our mascot “Mo,” it’s for pets who walk with confidence.',
  },
];

const recommended = products.slice(0, 3);

const reviews = [
  {
    name: 'Jay C.',
    comment: 'Fits like a dream and the quality is insane. Got so many compliments.',
  },
  {
    name: 'Morgan D.',
    comment: 'Custom fit changed everything. This is luxury that feels like me.',
  },
  {
    name: 'Tasha L.',
    comment: 'I love the vibe — it feels like it was made just for me. ✨',
  },
];

export default function ProductItemPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) return <div className="p-10 text-center text-lg">Product not found.</div>;

  return (
    <div className="min-h-screen px-4 md:px-12 py-24 font-urbanist text-black bg-white">
      {/* Nav Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Amo La Moda Logo" className="h-8 w-auto" />
            <h1 className="text-xl font-playfair tracking-wide">Amo La Moda</h1>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-semibold">
            {['Shop', 'Men', 'Women', 'Paw Print Collection'].map((link) => (
              <Link
                key={link}
                to="#"
                className={`hover:border-b-2 pb-1 transition ${
                  window.location.pathname.includes(link.toLowerCase()) ? 'border-black' : 'border-transparent'
                }`}
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="pt-28">
        {/* Breadcrumbs */}
        <p className="text-xs text-neutral-500 mb-8">Home / Shop / {product.name}</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt={product.name} className="w-full h-auto rounded-xl shadow" />
            ))}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-playfair mb-2">{product.name}</h1>
            <p className="text-xl text-neutral-700 mb-6">{product.price}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Choose Size</p>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'border-neutral-300 text-neutral-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedSize('Custom')}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition border ${
                    selectedSize === 'Custom' ? 'bg-black text-white border-black' : 'bg-white border-black text-black hover:bg-black hover:text-white'
                  }`}
                >
                  ✂ Custom Fit
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-black text-white text-sm py-3 rounded-full font-semibold hover:bg-neutral-800 transition">
              Add to Cart
            </button>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-md font-bold mb-1">Description</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Custom Fit Info */}
            <div className="mt-8 p-4 border rounded-xl bg-neutral-50">
              <p className="text-sm font-medium text-black">
                Tailored to your dimensions. No guessing. No compromises.
                Our custom fit service ensures every piece fits just how you like it.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Items */}
        <div className="mt-24">
          <h2 className="text-2xl font-playfair mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommended.map((item) => (
              <motion.div key={item.id} className="cursor-pointer group" whileHover={{ scale: 1.03 }}>
                <img src={item.images[0]} alt={item.name} className="w-full h-[400px] object-cover rounded-xl" />
                <div className="mt-3">
                  <h3 className="font-medium text-base font-playfair">{item.name}</h3>
                  <p className="text-sm text-neutral-500">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-24">
          <h2 className="text-2xl font-playfair mb-6">What People Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded-xl bg-neutral-50 shadow-sm">
                <p className="text-sm text-neutral-600 italic">"{review.comment}"</p>
                <p className="mt-2 text-xs font-semibold text-neutral-800">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
