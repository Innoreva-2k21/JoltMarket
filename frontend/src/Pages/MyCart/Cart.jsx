"use client"
import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartManager/CartManager";
import { toast } from "react-toastify";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [myCart, setMyCart] = useState([]); // Initialize myCart as an empty array

  // Check if phone number is Indian
  const isIndianPhoneNumber = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    return cleanNumber.startsWith("91") || cleanNumber.match(/^[6-9]\d{9}$/);
  };

  // Function to remove item from the cart
  const delCart = (ind) => {
    removeFromCart(ind);
    toast.success("Item removed from cart");

    // Update localStorage with updated cart
    localStorage.setItem("carts", JSON.stringify(myCart)); // Save updated cart to localStorage
  };

  // Clear the cart
  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully");
    localStorage.removeItem("carts"); // Remove cart from localStorage
  };

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("carts");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart); // Parse the stored string back into an array of objects
        setMyCart(parsedCart); // Set the parsed cart data into state
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    } else {
      setMyCart(cart); // If no cart in localStorage, use the initial cart
    }
  }, [cart]); // This effect runs when the component mounts or when the cart changes

  // Sync myCart with localStorage whenever it changes
  useEffect(() => {
    if (myCart.length > 0) {
      localStorage.setItem("carts", JSON.stringify(myCart)); // Store updated cart in localStorage
    }
  }, [myCart]); // This effect runs whenever myCart changes

  return (
    <div className="dark:bg-black">
      <div className="container m-0 mx-auto text-center p-[20px] relative dark:bg-black">
        <h1 className="font-medium text-3xl mb-5 text-slate-700 dark:text-white">
          Shopping Cart
        </h1>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2 md:py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute top-5 right-2"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {myCart?.map((product, index) => (
            <div
              className="bg-white shadow-md rounded-lg p-2 flex flex-col dark:bg-gray-800"
              key={index}
            >
              <div className="w-full h-48 mb-2 overflow-hidden">
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
              <h3 className="text-lg font-semibold text-left text-gray-800 dark:text-white">
                {product.productName}
              </h3>
              <p className="text-gray-600 text-left line-clamp-2 dark:text-gray-100">
                <strong className="text-gray-700 dark:text-gray-300">
                  Details:
                </strong>{" "}
                {product.productDetails}
              </p>
              <p className="text-gray-600 text-left line-clamp-2 dark:text-gray-100">
                <strong className="text-gray-700 dark:text-gray-300">
                  Category:
                </strong>{" "}
                {product.productCategory}
              </p>
              <p className="text-gray-600 text-left line-clamp-2 dark:text-gray-100">
                <strong className="text-gray-700 dark:text-gray-300">
                  Phone:
                </strong>{" "}
                {product.phoneNumber}
              </p>
              <div className="text-xl font-bold mb-2 text-left text-gray-700 dark:text-white">
                ₹{product.price}
              </div>
              <button
                onClick={() => delCart(index)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full mt-auto"
              >
                Remove Item
              </button>
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
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full mt-2"
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
