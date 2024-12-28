import React from "react";
import { useCart } from "../../Context/CartManager/CartManager";
import { toast } from "react-toastify";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Add function to check if phone number is Indian
  const isIndianPhoneNumber = (phoneNumber) => {
    // Remove any spaces, dashes, or other characters
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    // Check if number starts with 91 or +91
    return cleanNumber.startsWith("91") || cleanNumber.match(/^[6-9]\d{9}$/);
  };

  // Modify delCart to remove item by id or index
  const delCart = (ind) => {
    removeFromCart(ind);
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully");
  };

  return (
    <div className="dark:bg-black">
      {/* <div className='text-center'>
      <h1 className='font-medium text-3xl mb-5 mt-5 text-slate-700'>
          Shopping Cart
      </h1>
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
    </div> */}

      <div class="container m-0 mx-auto text-center p-[20px] relative dark:bg-black">
        <h1 className="font-medium text-3xl mb-5 text-slate-700 dark:text-white">
          Shopping Cart
        </h1>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2 md:py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute top-5 right-2"
          onClick={() => handleClearCart()}
        >
          {" "}
          Clear Cart
        </button>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cart.map((product, index) => (
            <div
              class="bg-white shadow-md rounded-lg p-2 flex flex-col dark:bg-gray-800"
              key={index}
            >
              <div class="w-full h-48 mb-2 overflow-hidden">
                {product.image ? (
                  <img
                    class="w-full h-full object-contain object-center"
                    src={product.image}
                    alt={product.productName}
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={`https://placehold.co/800?text=${product.productName}&font=roboto`}
                    class="w-full h-full object-contain object-center"
                    alt={product.productName}
                  />
                )}
              </div>
              <h3 class="text-lg font-semibold text-left text-gray-800 dark:text-white">
                {product.productName}
              </h3>
              <p class="text-gray-600 text-left line-clamp-2 dark:text-gray-100">
                <strong className="text-gray-700 dark:text-gray-300">
                  Details:
                </strong>{" "}
                {product.productDetails}
              </p>
              <p class="text-gray-600 text-left line-clamp-2 dark:text-gray-100">
                <strong className="text-gray-700 dark:text-gray-300">
                  Category:
                </strong>{" "}
                {product.productCategory}
              </p>
              <p class="text-gray-600 text-left line-clamp-2 dark:text-gray-100">
                <strong className="text-gray-700 dark:text-gray-300">
                  Phone:
                </strong>{" "}
                {product.phoneNumber}
              </p>
              <div class="text-xl font-bold mb-2 text-left text-gray-700 dark:text-white">
                ₹{product.price}
              </div>
              <button
                onClick={() => delCart(index)}
                class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full mt-auto"
              >
                Remove Item
              </button>
              {/* Only show WhatsApp button for Indian numbers */}
              {isIndianPhoneNumber(product.phoneNumber) && (
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/${
                        product.phoneNumber.startsWith("+")
                          ? product.phoneNumber.substring(1)
                          : product.phoneNumber
                      }?text=${encodeURIComponent(
                        `Hi, I'm interested in ${product.productName}.`
                      )}`,
                      "_blank"
                    )
                  }
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full mt-2"
                >
                  Chat on WhatsApp
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
