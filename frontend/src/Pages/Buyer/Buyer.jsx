import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartManager/CartManager";
import { toast } from "react-toastify";
import { apiUrl } from "../../utils/api";

function Buyer() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addCart = (index) => {
    addToCart(filteredProducts[index]);
    toast.success("Item added to cart successfully");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl("/product/entries"));
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on price, name, and category
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      const matchesPrice = price >= min && price <= max;

      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.productCategory === selectedCategory;

      return matchesPrice && matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, searchTerm, selectedCategory, products]);

  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
      className="dark:bg-black"
    >
      <section className="mt-[20px] text-center">
        <h1 className="font-medium text-3xl mb-8 text-slate-700 dark:text-white">
          Featured Products
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 dark:text-white">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border px-4 py-2 rounded-md dark:text-white"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="Books & Study">Books & Study</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing & Accessories">Clothing & Accessories</option>
            <option value="Room Essentials">Room Essentials</option>
            <option value="Sports & Fitness">Sports & Fitness</option>
            <option value="Games & Entertainment">Games & Entertainment</option>
            <option value="Transport">Transport</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Travel & Bags">Travel & Bags</option>
            <option value="Hobbies & Creative">Hobbies & Creative</option>
            <option value="Free / Giveaway">Free / Giveaway</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Product List */}
        <div className="container mx-auto">
          {!loading && filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                No products matched your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col dark:bg-gray-700"
                  key={product._id || index}
                >
                  <div className="w-full h-48 mb-2 overflow-hidden dark:text-white">
                    {product.image ? (
                      <img
                        className="w-full h-full object-contain object-center"
                        src={product.image}
                        alt={product.productName}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={`https://placehold.co/800?text=${product.productName}&font=roboto`}
                        className="w-full h-full object-contain object-center"
                        alt={product.productName}
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-left text-gray-700 dark:text-white">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600 mb-2 text-left line-clamp-2 dark:text-white">
                    {product.productDetails}
                  </p>
                  <div className="text-xl font-bold mb-2 text-left text-gray-700 dark:text-white">
                    ₹{product.price}
                  </div>
                  <button
                    onClick={() => addCart(index)}
                    className="bg-[#3b1c80] text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full mt-auto dark:bg-blue-500 dark:hover:bg-[#1321DE]"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Buyer;
