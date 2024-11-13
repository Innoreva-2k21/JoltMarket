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
      {/* <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <h1>My eCommerce Store</h1>
        <div>
          <button onClick={handleCart} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
            Cart
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#FF5733', color: 'white', border: 'none', borderRadius: '5px' }}>
            Logout
          </button>
        </div>
      </header> */}

      <section className='mt-[20px] text-center'>
        <h1 className='font-medium text-3xl mb-8 text-slate-700'>
        Featured Products
      </h1>
        {/* <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
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
        </div> */}
        <div class="container mx-auto">
           <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product, index) => (
                <div class="bg-white shadow-md rounded-lg p-4 flex flex-col" key={index}> 
                <div class="w-full h-48 mb-2 overflow-hidden"> 
                  {product.image ? <img class="w-full h-full object-contain object-center" src={product.image} alt={product.productName} loading="lazy"/> : <img src={`https://placehold.co/800?text=${product.productName}&font=roboto`}class='w-full h-full object-contain object-center' alt={product.productName}/>}
                </div> 
                <h3 class="text-lg font-semibold mb-2 text-left text-gray-700">{product.productName}</h3> 
                <p class="text-gray-600 mb-2 text-left line-clamp-2">{product.productDetails}</p> 
                <div class="text-xl font-bold mb-2 text-left text-gray-700">${product.price}</div> 
                <button onClick={() => addCart(index)} class="bg-[#3b1c80] text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full mt-auto">Add to Cart</button> 
            </div> 
            ))}

            </div>
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
