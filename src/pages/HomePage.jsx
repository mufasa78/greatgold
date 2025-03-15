import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, TrendingUp, Scale } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "1oz Gold Bar",
    price: 2050.00,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
    description: "999.9 Fine Gold LBMA Certified"
  },
  {
    id: 2,
    name: "American Gold Eagle",
    price: 2150.00,
    image: "https://images.unsplash.com/photo-1624365169364-0640dd10e180?auto=format&fit=crop&w=800&q=80",
    description: "1oz American Eagle Gold Coin 2024"
  },
  {
    id: 3,
    name: "100g Gold Bar",
    price: 6500.00,
    image: "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?auto=format&fit=crop&w=800&q=80",
    description: "PAMP Suisse 100g Gold Bar"
  }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=2000&q=80')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.6)"
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Secure Your Future with Gold</h1>
          <p className="text-xl md:text-2xl mb-8">Investment grade gold bars and coins at competitive prices</p>
          <a href="#products" className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">
            View Products
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Shield className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
              <p className="text-gray-600">Fully insured and secured storage facilities</p>
            </div>
            <div className="text-center p-6">
              <TrendingUp className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Updates</h3>
              <p className="text-gray-600">Real-time precious metals market data</p>
            </div>
            <div className="text-center p-6">
              <Scale className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Products</h3>
              <p className="text-gray-600">LBMA certified gold products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price.toLocaleString()}</span>
                    <button
                      onClick={() => navigate(`/payment/${product.id}`)}
                      className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 