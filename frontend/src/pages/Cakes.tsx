import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useAuth } from "../hooks/use/user";
import { useNavigate } from "react-router-dom";

const Cakes = () => {
  const { products, loading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  console.log(products);

  const categories = [
    "All",
    "Birthday",
    "Wedding",
    "Custom",
    "Cupcakes",
    "Specialty",
  ];

  const filteredCakes = products.filter((cake) => {
    const matchesCategory =
      selectedCategory === "All" || cake.category === selectedCategory;
    const matchesPrice =
      cake.price >= priceRange[0] && cake.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-DreamToBerich text-4xl font-bold text-gray-800">
            Discover Our Delicious Cakes
          </h1>
          <p className="text-gray-600">
            Handcrafted with love, perfect for every occasion
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mb-4 flex items-center gap-2 rounded-lg bg-chocolate px-4 py-2 text-white hover:bg-chocolate/90"
          >
            <FiFilter />
            Filters
          </button>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="mb-4">
                <h3 className="mb-2 font-semibold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-1 ${
                        selectedCategory === category
                          ? "bg-chocolate text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <span>Ksh {priceRange[1]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Cakes Grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-chocolate border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCakes.map((cake) => (
              <motion.div
                key={cake._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1"
                onClick={() => navigate(`/product/${cake._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <button className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-chocolate hover:bg-white">
                    <IoMdHeartEmpty size={24} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {cake.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {cake.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-chocolate">
                      Ksh {cake.price.toLocaleString()}
                    </span>
                    <button className="rounded-full bg-chocolate px-4 py-2 text-sm text-white transition-colors hover:bg-chocolate/90">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCakes.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center text-gray-500">
            <p className="text-lg">No cakes found matching your criteria</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange([0, 10000]);
              }}
              className="mt-4 text-chocolate hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cakes;
