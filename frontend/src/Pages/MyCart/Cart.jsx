"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartManager/CartManager";
import { toast } from "react-toastify";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [myCart, setMyCart] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const isIndianPhoneNumber = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    return cleanNumber.startsWith("91") || cleanNumber.match(/^[6-9]\d{9}$/);
  };

  const delCart = (ind) => {
    removeFromCart(ind);
    toast.success("Item removed from cart");
    localStorage.setItem("carts", JSON.stringify(myCart));
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully");
    localStorage.removeItem("carts");
  };

  const handleSendToAPI = async () => {
    try {
      // Iterate over each product in the cart and send each one separately to the API
      for (const product of myCart) {
        const productData = {
          productName: product.productName,
          price: product.price,
          image: product.image,
          userEmail: userEmail,  // Get user email from localStorage
          productDetails: product.productDetails,
          productCategory: product.productCategory,
          phoneNumber: product.phoneNumber,
        };

        const response = await fetch("https://backjolt-1.onrender.com/product/createBuyed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          toast.success(`Product "${product.productName}" successfully sent to the server!`);
        } else {
          toast.error(`Failed to send product "${product.productName}". Please try again.`);
        }
      }

      // Clear the cart after all products are successfully sent
      clearCart();
      localStorage.removeItem("carts");
    } catch (error) {
      console.error("Error sending cart to the server:", error);
      toast.error("An error occurred while sending the cart.");
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("carts");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setMyCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    } else {
      setMyCart(cart);
    }

    // Fetch userEmail from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserEmail(parsedUser.email);  // Set userEmail from localStorage
    }
  }, [cart]);

  return (
    <div className="dark:bg-black">
      <div className="container m-0 mx-auto text-center p-[20px] relative dark:bg-black">
        <h1 className="font-medium text-3xl mb-5 text-slate-700 dark:text-white">
          Shopping Cart
        </h1>
        <div className="absolute top-5 right-2 flex gap-2">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2 md:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
            onClick={handleSendToAPI}
          >
            Submit Cart
          </button>
        </div>
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
