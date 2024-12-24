import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Seller() {
  const [productName, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate(); // Create a navigate function for navigation

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const userEmail = user ? user.email : null;

      if (userEmail) {
        try {
          const response = await fetch('http://localhost:5000/product/getEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail }),
          });

          if (response.ok) {
            const data = await response.json();
            setProducts(data); // Set the fetched products in state
          } else {
            console.error('Error fetching products:', response.statusText);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    // Validate fields
    if (!productName || !price || !productCategory || !productDetails || !phoneNumber || !productImage) {
      setErrorMessage('Please fill in all fields and upload an image.');
      return; // Stop form submission
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('productCategory', productCategory);
    formData.append('productDetails', productDetails);
    formData.append('phoneNumber', phoneNumber);

    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user ? user.email : null;
    formData.append('userEmail', userEmail);
    formData.append('image', productImage);

    try {
      const response = await fetch('http://localhost:5000/product/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh the page or redirect
        window.location.reload();
        alert("Uploaded");
      } else {
        const errorText = await response.text();
        console.error('Error creating product:', errorText);
        setErrorMessage('Failed to create product. Please try again.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product._id !== id));
        alert("Product deleted successfully");
      } else {
        const errorText = await response.text();
        console.error('Error deleting product:', errorText);
        setErrorMessage('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error during delete:', error);
      setErrorMessage('An error occurred while deleting the product.');
    }
  };

  // Function to handle updating a product
  const handleUpdate = (id) => {
    navigate(`/Update/${id}`); // Navigate to the update page
  };

  return (
      <div className='dark:bg-black'>
        <div class="p-5 font-sans text-center text-black max-w-lg mx-auto dark:bg-black">

      <h1 className='font-medium text-3xl mb-5 text-slate-700 dark:text-white'>
        List Your Product for Sale
      </h1>

      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md dark:bg-gray-800">

        {/* Form Fields */}
        <input
  type="text"
  placeholder="Product Name"
  value={productName}
  onChange={(e) => setProductName(e.target.value)}
  class="p-3 text-base rounded-lg border border-gray-300 transition-transform duration-200 bg-gray-200 dark:bg-gray-700 dark:text-white"
/>

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setProductPrice(e.target.value)}
class="p-3 text-base rounded-lg border border-gray-300 transition-transform duration-200 bg-gray-200 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Product Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
class="p-3 text-base rounded-lg border border-gray-300 transition-transform duration-200 bg-gray-200 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="file"
          onChange={(e) => setProductImage(e.target.files[0])}
class="p-3 text-base rounded-lg border file:bg-gray-200 file:border-2 file:text-gray-400 file:rounded-md file:border-gray-300 border-gray-300 transition-transform duration-200 bg-gray-200 dark:bg-gray-700 dark:text-white"
        />

        <textarea
          placeholder="Product Details"
          rows="4"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
class="p-3 text-base rounded-lg border border-gray-300 transition-transform duration-200 bg-gray-200 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
class="p-3 text-base rounded-lg border border-gray-300 transition-transform duration-200 bg-gray-200 dark:bg-gray-700 dark:text-white"
        />

        <button type="submit" style={{
          padding: '15px',
          fontSize: '1em',
          color: 'white',
          backgroundColor: 'purple-700',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s, transform 0.3s',
        }} className="bg-purple-700 dark:bg-blue-500">
          Submit
        </button>
      </form>

      {/* <button onClick={handleLogout} style={{
        padding: '15px',
        fontSize: '1em',
        color: 'white',
        backgroundColor: '#f44336',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s, transform 0.3s',
      }}>
        Logout
      </button> */}

      <h1 className='font-medium text-3xl mb-5 mt-5 text-slate-700 dark:text-white'>Your Products</h1>
      <div className='flex flex-col items-center justify-center gap-4 dark:bg-gray-800'>
        {products.map((product) => (
          // <div key={product._id} style={{
          //   padding: '10px',
          //   border: '1px solid #ddd',
          //   borderRadius: '10px',
          //   backgroundColor: '#f9f9f9',
          //   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          // }}>
          //   <h3>{product.productName}</h3>
          //   <p>Price: ${product.price}</p>
          //   <p>Category: {product.productCategory}</p>
          //   <p>{product.productDetails}</p>
          //   <p>Contact: {product.phoneNumber}</p>
          //   <button onClick={() => handleUpdate(product._id)} style={{
          //     padding: '10px',
          //     fontSize: '0.9em',
          //     color: 'white',
          //     backgroundColor: '#2196F3',
          //     border: 'none',
          //     borderRadius: '5px',
          //     cursor: 'pointer',
          //     marginRight: '10px',
          //   }}>
          //     Update
          //   </button>
          //   <button onClick={() => handleDelete(product._id)} style={{
          //     padding: '10px',
          //     fontSize: '0.9em',
          //     color: 'white',
          //     backgroundColor: '#f44336',
          //     border: 'none',
          //     borderRadius: '5px',
          //     cursor: 'pointer',
          //   }}>
          //     Delete
          //   </button>
          // </div>
<div class="w-full md:w-3/4 lg:w-4/5 xl:w-[900px] p-4 border border-gray-300 rounded shadow-sm bg-white flex flex-col items-center text-center dark:bg-gray-800" key={product._id}>
<img src={product.image} class="w-40 h-40 object-cover" alt="Product Image" />
<p class="text-lg font-semibold text-gray-800 text-left dark:text-white">{product.productName}</p>
  <p class="text-sm text-gray-800 text-left dark:text-white">Price: <span class="font-medium">Rs. {product.price}</span></p>
  <p class="text-sm text-gray-800 text-left dark:text-white">Category: <span class="font-medium">{product.productCategory}</span></p>
  <p class="text-sm text-gray-800 text-left dark:text-white">{product.productDetails}</p>
  <p class="text-sm text-gray-800 text-left dark:text-white">Contact: <span class="font-medium">{product.phoneNumber}</span></p>

  <div class="flex space-x-2 mt-4">
    <button class="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800" onClick={() => handleUpdate(product._id)}>Update</button>
    <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(product._id)}>Delete</button>
  </div>
</div>

        ))}
      </div>
    </div>
    </div>
  );
}

export default Seller;
