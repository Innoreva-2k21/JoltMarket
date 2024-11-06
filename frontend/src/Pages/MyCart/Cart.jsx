import React from 'react';
import { useCart } from '../../Context/CartManager/CartManager';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Modify delCart to remove item by id or index
  const delCart = (ind) => {
    alert("removed from cart");
    removeFromCart(ind);
     // Assumes removeFromCart accepts a product or identifier.
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={() => {clearCart();alert("cleared Cart")}} style={{ padding: '10px 20px', backgroundColor: '#ff4c4c', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px' }}>
        Clear Cart
      </button>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {cart.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
            <h3>{product.productName}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.productCategory}</p>
            <p><strong>Details:</strong> {product.productDetails}</p>
            <p><strong>Phone:</strong> {product.phoneNumber}</p>
            {product.image && <img src={product.image} alt={product.productName} style={{ width: '100%', borderRadius: '10px' }} />}
            <button onClick={() => delCart(index)} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' }}>
              Remove Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
