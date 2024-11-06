import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartManager/CartManager';

function Byer() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('You have been logged out');
    window.location.reload();
  };

  const handleCart = () => {
    navigate('/Cart');
  };

  const addCart = (index) => {
    alert("added to cart");
    addToCart(products[index]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/entries');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <h1>My eCommerce Store</h1>
        <div>
          <button onClick={handleCart} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
            Cart
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#FF5733', color: 'white', border: 'none', borderRadius: '5px' }}>
            Logout
          </button>
        </div>
      </header>

      <section style={{ marginTop: '20px' }}>
        <h2>Featured Products</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {products.map((product, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
              <h3>{product.productName}</h3>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Category:</strong> {product.productCategory}</p>
              <p><strong>Details:</strong> {product.productDetails}</p>
              <p><strong>Phone:</strong> {product.phoneNumber}</p>
              {product.image && <img src={product.image} alt={product.productName} style={{ width: '100%', borderRadius: '10px' }} loading="lazy" />}
              <button onClick={() => addCart(index)} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Categories</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }}>Electronics</button>
          <button style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }}>Clothing</button>
          <button style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }}>Home Goods</button>
        </div>
      </section>

      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Byer;
